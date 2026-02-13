/**
 * Custom Zoom Gallery – GSAP ScrollTrigger v2.0
 *
 * Stack effect: images piled with random rotations / offsets.
 * On scroll each card straightens, scales up to a configured
 * max-width, then fades out to reveal the next card.
 *
 * Backward-compatible: accepts both old config (scaleStart/scaleEnd)
 * and new config (maxWidth).
 */

(function () {
	'use strict';

	gsap.registerPlugin(ScrollTrigger);

	/** Prevent double-init */
	const initialized = new WeakSet();

	/* --------------------------------------------------
	   Deterministic pseudo-random per index
	   -------------------------------------------------- */
	function seeded(i) {
		const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
		return x - Math.floor(x);
	}

	function cardPose(index) {
		return {
			rotation: (seeded(index) - 0.5) * 24,
			x:        (seeded(index + 50) - 0.5) * 40,
			y:        (seeded(index + 99) - 0.5) * 30,
		};
	}

	/* ==================================================
	   Controller
	   ================================================== */
	class ZoomGallery {
		constructor(container) {
			if (initialized.has(container)) return;
			initialized.add(container);

			this.container = container;
			this.inner     = container.querySelector('.epw-zoom-inner');
			this.items     = gsap.utils.toArray(
				container.querySelectorAll('.epw-zoom-item')
			);

			if (this.items.length < 2) return;

			/* ---- config (backward compatible) ---- */
			const raw = container.getAttribute('data-gallery-config');
			const c   = raw ? JSON.parse(raw) : {};

			this.cfg = {
				scrub    : c.scrub !== false,
				pin      : c.pin   !== false,
				maxWidth : parseFloat(c.maxWidth)  || 500,
				fadeStart: parseFloat(c.fadeStart)  || 0.5,
			};

			/* ---- a11y ---- */
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				this.items.forEach((el, i) =>
					gsap.set(el, { opacity: i === 0 ? 1 : 0 })
				);
				return;
			}

			this.build();
		}

		/* ---------- main animation ---------- */
		build() {
			const { items, cfg, inner, container } = this;
			const n = items.length;

			/*
			 * 1. Initial "messy stack" — small images with random
			 *    rotations + slight x / y offsets, first on top.
			 */
			items.forEach((el, i) => {
				const pose = cardPose(i);
				gsap.set(el, {
					scale   : 1,
					opacity : 1,
					rotation: pose.rotation,
					x       : pose.x,
					y       : pose.y,
					zIndex  : n - i,
				});
			});

			/*
			 * 2. ScrollTrigger.
			 *
			 *    Scroll distance = (n-1) * height of the inner panel.
			 *    Uses a function so invalidateOnRefresh works on resize.
			 */
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger            : container,
					start              : 'top top',
					end                : () => {
						const h = inner.offsetHeight || window.innerHeight;
						return '+=' + (h * (n - 1));
					},
					scrub              : cfg.scrub ? 1 : false,
					pin                : cfg.pin ? inner : false,
					anticipatePin      : 1,
					invalidateOnRefresh: true,
				},
			});

			/*
			 * 3. Per-card animation (all except the last).
			 *
			 *    Phase A  →  straighten, center, scale up to maxWidth
			 *    Phase B  →  fade out + overshoot scale slightly
			 */
			items.forEach((el, i) => {
				if (i === n - 1) return;

				const img = el.querySelector('img');

				const segStart = i / (n - 1);
				const segDur   = 1 / (n - 1);
				const phaseA   = segDur * cfg.fadeStart;
				const phaseB   = segDur * (1 - cfg.fadeStart);

				/*
				 * Scale ratio: current rendered width → maxWidth.
				 * Clamp to at least 1.2 so there's always visible growth.
				 */
				const baseW     = (img && img.offsetWidth > 0) ? img.offsetWidth : 260;
				const scaleGoal = Math.max(cfg.maxWidth / baseW, 1.2);

				// Phase A — straighten & grow
				tl.to(el, {
					rotation: 0,
					x       : 0,
					y       : 0,
					scale   : scaleGoal,
					duration: phaseA,
					ease    : 'power2.out',
				}, segStart);

				// Phase B — fade out + slight extra zoom
				tl.to(el, {
					opacity : 0,
					scale   : scaleGoal * 1.15,
					duration: phaseB,
					ease    : 'power1.in',
				}, segStart + phaseA);
			});
		}

		/* ---------- teardown ---------- */
		destroy() {
			ScrollTrigger.getAll().forEach(st => {
				if (st.trigger === this.container) st.kill();
			});
			initialized.delete(this.container);
		}
	}

	/* ==================================================
	   Bootstrap
	   ================================================== */
	function initAll() {
		document.querySelectorAll('.epw-zoom-container').forEach(c => {
			new ZoomGallery(c);
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAll);
	} else {
		initAll();
	}

	/* ---- Elementor front-end (single registration) ---- */
	let elementorRegistered = false;

	function registerElementor() {
		if (elementorRegistered) return;
		if (!window.elementorFrontend?.hooks) return;
		elementorRegistered = true;

		window.elementorFrontend.hooks.addAction(
			'frontend/element_ready/zoom-gallery.default',
			function ($scope) {
				const c = $scope[0].querySelector('.epw-zoom-container');
				if (c) {
					initialized.delete(c);
					new ZoomGallery(c);
				}
			}
		);
	}

	registerElementor();

	if (typeof jQuery !== 'undefined') {
		jQuery(window).on('elementor/frontend/init', registerElementor);
	}
})();
