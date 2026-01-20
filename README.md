# Orbit Customs - WordPress Plugin

![Version](https://img.shields.io/badge/version-1.2.7-blue.svg)
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
---

## 📦 Installation

1. Download the plugin ZIP file
2. Go to **WordPress Admin → Plugins → Add New**
3. Click **Upload Plugin** and select the ZIP file
4. Click **Install Now** and then **Activate**

---

## 🚀 Quick Start

### Method: Elementor Widget

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

## 🎨 CSS Customization Guide

### File Location
```
includes/widgets/orbit-tabs/assets/orbit-tabs.css
```

---
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

- **WordPress**: 6.9 or higher
- **PHP**: 8.2 or higher
- **Elementor** (optional): For widget functionality

---

##  Troubleshooting 

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
- Visit: [https://joandev.com/contacto/](https://joandev.com/contacto/)
- Email: [EMAIL_ADDRESS]


---

**Made with ❤️ in Galiza, Spain**
