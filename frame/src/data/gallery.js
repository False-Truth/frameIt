// Helper function to get the correct base URL for images
const getImageUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export const galleryItems = [
  {
    id: 1,
    title: "Radha Krishna Painting",
    category: "Religious Art",
    coverImage: getImageUrl("images/wallpaperflare.com_wallpaper.jpg"),
    images: [
      getImageUrl("images/wallpaperflare.com_wallpaper.jpg"),
      getImageUrl("images/wallpaperflare.com_wallpaper1.jpg"),
      getImageUrl("images/wallpaperflare.com_wallpaper (1).jpg")
    ],
    video: "https://youtube.com/embed/example1",
    description: "A detailed hand-made canvas painting depicting the divine love of Radha Krishna, created with vibrant colors and intricate details."
  },
  {
    id: 2,
    title: "Landscape Sunset",
    category: "Landscape",
    coverImage: getImageUrl("images/wallpaperflare.com_wallpaper1.jpg"),
    images: [
      getImageUrl("images/wallpaperflare.com_wallpaper1.jpg"),
      getImageUrl("images/wallpaperflare.com_wallpaper.jpg")
    ],
    description: "Beautiful sunset landscape painting capturing the golden hour with stunning color transitions."
  },
  {
    id: 3,
    title: "Custom Family Portrait",
    category: "Portrait",
    coverImage: getImageUrl("images/wallpaperflare.com_wallpaper (1).jpg"),
    images: [
      getImageUrl("images/wallpaperflare.com_wallpaper (1).jpg"),
      getImageUrl("images/wallpaperflare.com_wallpaper.jpg")
    ],
    description: "Personalized family portrait commissioned for a special anniversary celebration."
  },
  {
    id: 4,
    title: "Abstract Modern Art",
    category: "Abstract",
    coverImage: getImageUrl("images/wallpaperflare.com_wallpaper.jpg"),
    images: [
      getImageUrl("images/wallpaperflare.com_wallpaper.jpg"),
      getImageUrl("images/wallpaperflare.com_wallpaper1.jpg")
    ],
    description: "Contemporary abstract piece using bold colors and dynamic brush strokes."
  },
  {
    id: 5,
    title: "Taj Mahal Frame",
    category: "Monument",
    coverImage: getImageUrl("images/wallpaperflare.com_wallpaper1.jpg"),
    images: [
      getImageUrl("images/wallpaperflare.com_wallpaper1.jpg"),
      getImageUrl("images/wallpaperflare.com_wallpaper (1).jpg"),
      getImageUrl("images/wallpaperflare.com_wallpaper.jpg")
    ],
    video: "https://youtube.com/embed/example2",
    description: "Elegant framing of the Taj Mahal with custom decorative borders and archival quality materials."
  },
  {
    id: 6,
    title: "Nature floral",
    category: "Nature",
    coverImage: getImageUrl("images/wallpaperflare.com_wallpaper (1).jpg"),
    images: [
      getImageUrl("images/wallpaperflare.com_wallpaper (1).jpg"),
      getImageUrl("images/wallpaperflare.com_wallpaper1.jpg")
    ],
    description: "Delicate floral composition featuring seasonal blooms in a harmonious arrangement."
  }
];
