// src/app/trails/page.tsx
"use client";

import ModuleCard from "./_components/moduleCard";

export default function TrailsPage() {
  const modules = [
    {
      slug: "html",
      title: "HTML",
      subtitle: "Dominando o HTML do zero!",
      image: "/images/html.png",
      completed: true,
    },
    {
      slug: "css",
      title: "CSS",
      subtitle: "Dominando o CSS do zero!",
      image: "/images/css.png",
      completed: true,
    },
    {
      slug: "javascript",
      title: "JavaScript",
      subtitle: "Dominando o JavaScript do zero!",
      image: "/images/javascript.png",
      completed: true,
    },
  ];

  return (
    <div className="p-6 text-zinc-50">
      <h1 className="text-3xl font-bold mb-12 ml-12">Trilhas</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ml-12">
        {modules.map((m, index) => (
          <ModuleCard
            key={index}
            slug={m.slug}
            title={m.title}
            subtitle={m.subtitle}
            image={m.image}
            completed={m.completed}
          />
        ))}
      </div>
    </div>
  );
}
