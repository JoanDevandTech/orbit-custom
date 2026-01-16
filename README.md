# Orbit Customs - WordPress Plugin

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![WordPress](https://img.shields.io/badge/WordPress-5.0%2B-brightgreen.svg)
![PHP](https://img.shields.io/badge/PHP-7.3%2B-purple.svg)
![Elementor](https://img.shields.io/badge/Elementor-Compatible-orange.svg)

**Professional visual components for WordPress with stunning Polaroid Tabs and Elementor integration.**

---

## 🎯 Features

- ✨ **Polaroid-Style Tabs**: Unique tabbed navigation with stacked, rotated images
- 🎨 **Stunning Visual Design**: CSS Grid layout with dynamic animations
- 📱 **Fully Responsive**: Adapts beautifully from desktop to mobile
- ♿ **Accessibility First**: ARIA attributes and keyboard navigation
- 🚀 **Performance Optimized**: Conditional asset loading (only when needed)
- 🔧 **Elementor Integration**: Drag-and-drop widget with visual controls
- 🎯 **Shortcode Support**: Use `[orbit_tabs]` anywhere

---

## 📦 Installation

1. Download the plugin ZIP file
2. Go to **WordPress Admin → Plugins → Add New**
3. Click **Upload Plugin** and select the ZIP file
4. Click **Install Now** and then **Activate**

---

## 🚀 Usage

### Method 1: Shortcode

Add the following shortcode to any page, post, or widget:

```
[orbit_tabs]
```

### Method 2: Elementor Widget

1. Open a page with **Elementor**
2. Search for **"Orbit Polaroid Tabs"** in the widgets panel
3. Drag the widget to your desired location
4. Configure tabs, upload images, and set CTA buttons
5. Preview and publish!

---

## 🎨 Component Structure

The Orbit Polaroid Tabs component features:

- **3-Column Layout (Desktop)**: Left controls | Central stage | Right controls
- **Lateral Tab Buttons**: Odd tabs on left, even tabs on right
- **Central Image Gallery**: Stacked Polaroid-style images with rotation
- **Floating CTA Buttons**: Clickable call-to-action tags
- **Vignette Overlay**: Gradient effect for visual focus
- **Responsive Collapse**: Single-column layout on mobile/tablet

---

## ⚙️ Technical Specifications

### CSS Features
- CSS Grid layout (200px | 1fr | 200px)
- Polaroid effect (asymmetric borders, soft shadows)
- Dynamic rotation classes for image stacking
- Smooth transitions and hover micro-interactions
- Responsive breakpoints at 1080px and 640px

### JavaScript Features
- Vanilla JS (no dependencies)
- Tab switching with smooth transitions
- ARIA attribute management
- Keyboard navigation (Arrow keys, Home, End)
- Elementor preview compatibility

### Accessibility
- Full ARIA support (roles, states, properties)
- Keyboard navigation
- Focus management
- Screen reader friendly
- Reduced motion support

---

## 📋 Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.3 or higher
- **Elementor** (optional): For widget functionality

---

## 🛠️ File Structure

```
orbit-custom/
├── orbit-customs.php          # Main plugin file
├── assets/
│   ├── css/
│   │   └── orbit-tabs.css     # Component styles
│   └── js/
│       └── orbit-tabs.js      # Tab navigation logic
├── includes/
│   ├── shortcode-handler.php  # Shortcode rendering
│   └── elementor-widget.php   # Elementor integration
└── README.md                  # Documentation
```

---

## 🎯 Customization

### Custom Colors

You can override the default colors using CSS:

```css
:root {
	--orbit-tabs-primary: #2196F3;
	--orbit-tabs-secondary: #1976D2;
}
```

### Custom Rotations

Modify rotation angles in `orbit-tabs.css`:

```css
.orbit-polaroid:nth-child(1) {
	transform: translate(-50%, -50%) rotate(-8deg);
}
```

---

## 🐛 Troubleshooting

**Issue**: Tabs not switching
- **Solution**: Clear browser cache and ensure JavaScript is enabled

**Issue**: Styles not loading
- **Solution**: Check that the shortcode is present on the page

**Issue**: Elementor widget not appearing
- **Solution**: Ensure Elementor is installed and activated

---

## 📝 Changelog

### Version 1.0.0 (2026-01-15)
- Initial release
- Polaroid Tabs component
- Elementor widget integration
- Shortcode support
- Full accessibility features

---

## 👨‍💻 Author

**Joan Dev & Tech**
- Website: [https://joandev.com](https://joandev.com)
- Location: Galiza, Spain

---

## 📄 License

This plugin is licensed under the GPLv2 or later.

---

## 🙏 Support

For support, feature requests, or bug reports, please visit:
[https://joandev.com/orbit-customs](https://joandev.com/orbit-customs)

---

**Made with ❤️ in Galiza, Spain**
