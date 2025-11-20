
interface TrailContent {
  title: string;
  videos: { title: string; url: string }[];
  materials: { title: string; link: string }[];
}

const trailData: Record<string, TrailContent> = {
  html: {
    title: "Trilha de HTML",
    videos: [
      { title: "Introdução ao HTML", url: "https://youtu.be/5Hn58p-hYC0?si=P7KRUe5DiJepddzd" },
      { title: "Tags mais usadas", url: "https://youtu.be/GVVfzrycJ1M?si=gj3ZBMkL6_yJG9C9" },
      { title: "Formulários", url: "https://youtu.be/Wa1Ji2t2gmc?si=YAjeufZ_VFKcutUx" },
    ],
    materials: [
      { title: "Guia completo HTML", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { title: "Cheatsheet HTML", link: "#" },
    ],
  },

  css: {
    title: "Trilha de CSS",
    videos: [
      { title: "Introdução ao CSS", url: "https://youtu.be/HtVRRHoASes?si=tUcXrtHLERxtVsRg" },
      { title: "Flexbox completo", url: "https://youtu.be/EM0grbJ3Lws?si=cMsnnw2x7Al4LMSI" },
      { title: "Grid Layout", url: "https://youtu.be/hKXOVD2Yrj8?si=wd4B9qK-0rWiFo-M" },
    ],
    materials: [
      { title: "Documentação CSS", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
  },

  javascript: {
    title: "Trilha de JavaScript",
    videos: [
      { title: "Variáveis e tipos", url: "https://youtu.be/4Y87KSByqOY?si=TK5dHceFGT3KQvT4" },
      { title: "Funções", url: "https://youtu.be/RTfMHMQp2e4?si=2VW34tMmA8HmvYmV" },
      { title: "DOM na prática", url: "https://youtu.be/DcN49TD7it0?si=bG10JQK5TS4yz6gz" },
    ],
    materials: [
      { title: "Guia JS", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    ],
  },
};

export default async function TrailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = trailData[slug];


  if (!data) {
    return <h1 className="text-2xl p-6">Trilha não encontrada.</h1>;
  }

  return (
    <div className="p-6 text-zinc-50">
      
      <h1 className="text-3xl font-bold mb-6 ">{data.title}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">📹 Vídeos</h2>
        <ul className="space-y-2">
          {data.videos.map((video, index) => (
            <li key={index} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <a href={video.url} target="_blank" className="text-blue-400 hover:underline">
                {video.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">📘 Materiais</h2>
        <ul className="space-y-2">
          {data.materials.map((mat, index) => (
            <li key={index} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <a href={mat.link} target="_blank" className="text-blue-400">
                {mat.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
