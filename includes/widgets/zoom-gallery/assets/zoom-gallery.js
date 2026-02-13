/**
 * Custom Zoom Gallery - GSAP ScrollTrigger
 * Images stacked front-to-back; scroll scales up + fades out the front image.
 */

(function () {
	'use strict';

	gsap.registerPlugin(ScrollTrigger);

	/* Guard: track initialized containers to prevent double init */
	const initializedContainers = new WeakSet();

	/**
	 * Zoom Gallery Controller
	 */
	class EpwZoomGalleryController {
		constructor(container) {
			/* Prevent double initialization */
			if (initializedContainers.has(container)) {
				return;
			}
			initializedContainers.add(container);

			this.container = container;
			this.inner = container.querySelector('.epw-zoom-inner');
			this.items = gsap.utils.toArray(container.querySelectorAll('.epw-zoom-item'));

			if (this.items.length < 2) {
				return;
			}

			/* Read config from data attribute */
			const configAttr = container.getAttribute('data-gallery-config');
			this.config = configAttr ? JSON.parse(configAttr) : {};
			this.config.scrub = this.config.scrub !== false;
			this.config.pin = this.config.pin !== false;
			this.config.scaleStart = parseFloat(this.config.scaleStart) || 1;
			this.config.scaleEnd = parseFloat(this.config.scaleEnd) || 2.5;
			this.config.fadeStart = parseFloat(this.config.fadeStart) || 0.6;

			/* Respect reduced motion */
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				this.setupReducedMotion();
				return;
			}

			this.init();
		}

		init() {
			const itemCount = this.items.length;
			const { scaleStart, scaleEnd, fadeStart, scrub, pin } = this.config;

			/* Set initial state: all items stacked, first on top */
			this.items.forEach((item, i) => {
				gsap.set(item, {
					scale: scaleStart,
					opacity: 1,
					zIndex: itemCount - i
				});
			});

			/*
			 * Use a function for `end` so invalidateOnRefresh recalculates
			 * on resize / orientation change. Each image gets 100vh of scroll.
			 */
			const scrollVh = (itemCount - 1) * 100;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: this.container,
					start: 'top top',
					end: () => '+=' + (scrollVh * window.innerHeight / 100),
					scrub: scrub ? 1 : false,
					pin: pin ? this.inner : false,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				}
			});

			/*
			 * Animate each item except the last (it stays visible).
			 * fadeStart controls when opacity begins fading within each
			 * item's segment: 0 = immediate fade, 0.6 = fade after 60%.
			 */
			this.items.forEach((item, i) => {
				if (i === itemCount - 1) return;

				const segStart = i / (itemCount - 1);
				const segDuration = 1 / (itemCount - 1);

				/* Scale runs the full segment */
				tl.to(item, {
					scale: scaleEnd,
					duration: segDuration,
					ease: 'none',
				}, segStart);

				/* Opacity fades after fadeStart fraction of the segment */
				const fadeDelay = segDuration * fadeStart;
				const fadeDuration = segDuration * (1 - fadeStart);

				tl.to(item, {
					opacity: 0,
					duration: fadeDuration,
					ease: 'power1.in',
				}, segStart + fadeDelay);
			});
		}

		setupReducedMotion() {
			/* Show only first image, hide others */
			this.items.forEach((item, i) => {
				if (i > 0) {
					gsap.set(item, { opacity: 0 });
				}
			});
		}

		destroy() {
			ScrollTrigger.getAll().forEach(st => {
				if (st.trigger === this.container) {
					st.kill();
				}
			});
			initializedContainers.delete(this.container);
		}
	}

	/**
	 * Initialize all Zoom Gallery instances
	 */
	function initEpwZoomGalleries() {
		const containers = document.querySelectorAll('.epw-zoom-container');
		containers.forEach(container => {
			new EpwZoomGalleryController(container);
		});
	}

	/* Initialize on DOM ready */
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initEpwZoomGalleries);
	} else {
		initEpwZoomGalleries();
	}

	/*
	 * Elementor frontend support (single registration).
	 * We use a flag to avoid registering the hook twice.
	 */
	function registerElementorHook() {
		if (typeof window.elementorFrontend !== 'undefined' && window.elementorFrontend.hooks) {
			window.elementorFrontend.hooks.addAction(
				'frontend/element_ready/zoom-gallery.default',
				function ($scope) {
					const container = $scope[0].querySelector('.epw-zoom-container');
					if (container) {
						/* Remove from WeakSet so re-init works after Elementor re-render */
						initializedContainers.delete(container);
						new EpwZoomGalleryController(container);
					}
				}
			);
		}
	}

	/* Try immediate registration (editor already loaded) */
	registerElementorHook();

	/* Also register on init event for fresh page loads */
	if (typeof jQuery !== 'undefined') {
		jQuery(window).on('elementor/frontend/init', registerElementorHook);
	}

})();
