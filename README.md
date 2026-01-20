# Orbit Customs - WordPress Plugin

![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)
![WordPress](https://img.shields.io/badge/WordPress-5.0%2B-brightgreen.svg)
![PHP](https://img.shields.io/badge/PHP-7.3%2B-purple.svg)
![Elementor](https://img.shields.io/badge/Elementor-Compatible-orange.svg)

**Professional visual components for WordPress with stunning Polaroid Tabs and Elementor integration.**

---

## 🎯 Features

- ✨ **Polaroid-Style Tabs**: Unique tabbed navigation with professional image display
- 🎨 **Stunning Visual Design**: CSS Grid layout with smooth animations
- 📱 **Fully Responsive**: Perfect on desktop, tablet, and mobile
- ♿ **Accessibility First**: ARIA attributes and keyboard navigation
- 🚀 **Performance Optimized**: Assets load only when needed
- 🔧 **Elementor Integration**: Drag-and-drop widget with visual controls
- 🎯 **Shortcode Support**: Use `[orbit_tabs]` anywhere
- 🔄 **Modular Architecture**: Easy to extend with new widgets

---

## 📦 Installation

1. Download the plugin ZIP file
2. Go to **WordPress Admin → Plugins → Add New**
3. Click **Upload Plugin** and select the ZIP file
4. Click **Install Now** and then **Activate**

---

## 🚀 Quick Start

### Method 1: Shortcode

Add this to any page, post, or widget:

```
[orbit_tabs]
```

### Method 2: Elementor Widget

1. Open a page with **Elementor**
2. Search for **"Orbit Polaroid Tabs"** in the widgets panel
3. Drag the widget to your desired location
4. Configure tabs in **Left Tabs** and **Right Tabs** sections
5. Upload images (1 image per tab)
6. Set CTA buttons and positions
7. Preview and publish!

---

## 🎨 Widget Configuration

### Tab Structure (v1.1.0)

The widget uses **separate repeaters** for left and right columns:

#### **Left Tabs** (Left Column)
- Tab Title
- Tab Image (single image, 1:1 ratio)
- CTA Text
- CTA Link
- CTA Position (9 positions available)

#### **Right Tabs** (Right Column)
- Same fields as Left Tabs
- Text aligns to the right automatically

### Text Alignment

- **Left Column Tabs**: Text aligns LEFT
- **Right Column Tabs**: Text aligns RIGHT
- **Mobile/Tablet**: All tabs center automatically

### Image Display

- Each tab has **exactly 1 image** (1:1 ratio)
- Images display centered with polaroid-style border
- Hover effect: slight zoom (5%)
- No opacity reduction (100% visible)

---

## 🛠️ Project Structure

```
orbit-custom/
├── orbit-customs.php                    # Main plugin file (widget registry)
├── README.md                            # This file
├── .gitignore                          # Git ignore rules
└── includes/
    └── widgets/                        # All custom widgets
        └── orbit-tabs/                 # Orbit Tabs widget
            ├── elementor-widget.php    # Elementor integration
            ├── shortcode-handler.php   # Shortcode rendering
            └── assets/
                ├── orbit-tabs.css      # Widget styles
                └── orbit-tabs.js       # Tab navigation logic
```

### Why This Structure?

✅ **Modular**: Each widget is self-contained  
✅ **Scalable**: Easy to add new widgets  
✅ **Organized**: Clear separation of concerns  
✅ **Maintainable**: No spaghetti code

---

## ➕ Adding New Widgets

### Step 1: Create Widget Directory

```bash
includes/widgets/your-widget-name/
├── elementor-widget.php
├── shortcode-handler.php
└── assets/
    ├── your-widget.css
    └── your-widget.js
```

### Step 2: Register in Main File

Edit `orbit-customs.php` in the `register_widgets()` method:

```php
$this->widgets['your-widget-id'] = array(
    'name' => 'Your Widget Name',
    'class' => 'Elementor_Your_Widget_Class',
    'file' => 'widgets/your-widget-name/elementor-widget.php',
    'shortcode' => 'your_widget',
    'shortcode_handler' => 'widgets/your-widget-name/shortcode-handler.php',
    'assets' => array(
        'css' => 'widgets/your-widget-name/assets/your-widget.css',
        'js' => 'widgets/your-widget-name/assets/your-widget.js',
    ),
);
```

### Step 3: Create Widget Files

Use `includes/widgets/orbit-tabs/` as a reference template.

**That's it!** The plugin automatically:
- Registers the widget in Elementor
- Creates the shortcode
- Enqueues CSS/JS assets

---

## 🎨 CSS Customization Guide

### File Location
```
includes/widgets/orbit-tabs/assets/orbit-tabs.css
```

### Key Sections (with line numbers)

#### 1. **Variables** (Lines 9-19)
```css
:root {
    --orbit-tabs-spacing: 2rem;           /* General spacing */
    --orbit-tabs-border-radius: 4px;      /* Rounded corners */
    --orbit-tabs-transition: all 0.3s;    /* Animation speed */
    --orbit-polaroid-border: 12px;        /* Polaroid border thickness */
}
```

#### 2. **Grid Layout** (Lines 33-42)
```css
.orbit-tabs-wrapper {
    grid-template-columns: auto 1fr auto;  /* LEFT | CENTER | RIGHT */
    gap: 2rem;  /* Space between columns */
}
```

#### 3. **Tab Alignment** (Lines 69-80) ⭐ IMPORTANT
```css
/* LEFT COLUMN TABS - Align text to the left */
.orbit-tabs-left .orbit-tab-button {
    text-align: left;  /* Change to: center or right */
}

/* RIGHT COLUMN TABS - Align text to the right */
.orbit-tabs-right .orbit-tab-button {
    text-align: right;  /* Change to: center or left */
}
```

#### 4. **Image Size** (Lines 147-179) ⭐ IMPORTANT
```css
.orbit-polaroid-stack {
    height: 450px;  /* Image area height */
}

.orbit-polaroid {
    max-width: 320px;  /* Maximum image width */
    padding: 12px;     /* Polaroid border size */
    opacity: 1;        /* 100% visible (no transparency) */
}
```

#### 5. **Hover Effect** (Lines 181-188)
```css
.orbit-polaroid:hover {
    transform: translate(-50%, -50%) scale(1.05);  /* 5% zoom */
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);   /* Stronger shadow */
}
```

### Quick Customizations

**Make images larger:**
```css
/* Line 172 */
max-width: 400px;  /* Change from 320px */

/* Line 158 */
height: 550px;  /* Change from 450px */
```

**Change column spacing:**
```css
/* Line 40 */
gap: 3rem;  /* Change from 2rem */
```

**Center left column tabs:**
```css
/* Line 73 */
.orbit-tabs-left .orbit-tab-button {
    text-align: center;  /* Change from left */
}
```

**Change active tab color:**
```css
/* Line 90 */
background: linear-gradient(135deg, #FF5722 0%, #F44336 100%);
/* Replace with your colors */
```

### Search Tips

Look for these comments in the CSS:
- `/* EDIT HERE to change ...*/` - Editable sections
- `/* LEFT COLUMN TABS */` - Left tab styles
- `/* RIGHT COLUMN TABS */` - Right tab styles
- `/* Maximum image width */` - Image sizing
- `/* Full opacity */` - Image transparency

---

## ⚙️ Technical Specifications

### CSS Features
- CSS Grid layout (auto | 1fr | auto)
- Polaroid effect (asymmetric borders, soft shadows)
- Smooth transitions and hover effects
- Responsive breakpoints: 1080px, 640px
- No opacity reduction on images

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

## 📱 Responsive Behavior

### Desktop (>1080px)
- 3-column layout: Left tabs | Center stage | Right tabs
- Left tabs align left
- Right tabs align right
- Full-size images

### Tablet/Mobile (<1080px)
- Single column layout
- All tabs in horizontal rows
- Centered text (forced with `!important`)
- Smaller images
- Optimized spacing

---

## 📋 Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.3 or higher
- **Elementor** (optional): For widget functionality

---

## � Troubleshooting

**Tabs not switching**
- Clear browser cache
- Ensure JavaScript is enabled
- Check browser console for errors

**Styles not loading**
- Verify shortcode is on the page
- Check if assets are enqueued
- Clear WordPress cache

**Elementor widget not appearing**
- Ensure Elementor is installed and activated
- Refresh Elementor editor
- Check WordPress error logs

**Images not showing**
- Verify image URLs are correct
- Check file permissions
- Ensure images are uploaded to media library

**Text alignment not working**
- Check CSS file location
- Verify class names match
- Clear browser cache

---

##  Changelog

### Version 1.1.1 (2026-01-20)
- 🐛 **FIXED**: Removed unwanted opacity on polaroid images (now 100% visible)
- 🐛 **FIXED**: Removed cylindrical carousel effect (each tab has single image)
- 🐛 **FIXED**: Simplified image display - centered, clear, no rotations
- 🔧 **IMPROVED**: Added clear CSS comments with line numbers for easy customization
- 🔧 **IMPROVED**: Better hover effect (5% zoom instead of complex transforms)

### Version 1.1.0 (2026-01-20)
- ✨ **NEW**: Separate left/right tab repeaters
- ✨ **NEW**: Text alignment based on column (left/right)
- ✨ **NEW**: Simplified 1:1 image-to-tab ratio
- 🔧 **IMPROVED**: Responsive mobile/tablet layout
- 🔧 **IMPROVED**: Modular plugin architecture
- 🔧 **IMPROVED**: CSS organization with clear comments
- 🐛 **FIXED**: Removed opacity issues on images
- 🐛 **FIXED**: Centered tab layout on mobile

### Version 1.0.5
- Previous stable version

### Version 1.0.0 (2026-01-15)
- Initial release
- Polaroid Tabs component
- Elementor widget integration
- Shortcode support
- Full accessibility features

---

## 🎯 Naming Conventions

When adding new widgets, follow these conventions:

| Type | Format | Example |
|------|--------|---------|
| Widget ID | kebab-case | `your-widget-name` |
| Class Name | PascalCase | `Elementor_Your_Widget_Class` |
| Shortcode | snake_case | `your_widget` |
| Functions | prefixed snake_case | `orbit_customs_your_widget_*` |
| CSS Classes | kebab-case | `.your-widget-container` |

---

## 👨‍💻 Author

**Joan Dev & Tech**
- Website: [https://joandev.com](https://joandev.com)
- Location: Galiza, Spain

---

## 📄 License

This plugin is licensed under the GPLv2 or later.

```
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
```

---

## 🙏 Support

For support, feature requests, or bug reports:
- Visit: [https://joandev.com/orbit-customs](https://joandev.com/orbit-customs)
- Email: Contact through website

---

## 🚀 Future Roadmap

- [ ] Additional widget types
- [ ] Advanced animation options
- [ ] Theme builder integration
- [ ] Translation files (ES, EN, GL)
- [ ] Performance optimizations
- [ ] More CTA button styles

---

**Made with ❤️ in Galiza, Spain**
