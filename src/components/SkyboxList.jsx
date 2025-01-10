"use client";

import { useRouter } from "next/navigation";

function SkyboxList({ styles }) {
  // const history = useHistory();
  const router = useRouter();

  const handleCardClick = (styleId, image_jpg) => {
    console.log(styleId);
    router.push(`/scene-view?styleId=${styleId}&img_url=${image_jpg}`);

    // history.push(`/generateSkybox?skybox_style_id=${styleId}`);
  };

  return (
    <section className="skybox-list p-4">
      <h2 className="text-2xl font-bold mb-4">Available Skybox Styles</h2>
      <div className="styles-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {styles.map((style) => (
          <div
            key={style.id}
            className="style-card bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleCardClick(style.id, style.image_jpg)}
          >
            <img
              src={style.image_jpg || "placeholder.jpg"}
              alt={style.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-lg font-semibold p-4">{style.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkyboxList;
