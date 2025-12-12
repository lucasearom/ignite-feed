import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

import "./global.css";
import styles from "./App.module.css";
import { PostType } from "./global/types";

// author: { avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: sting

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: `https://github.com/lucasearom.png`,
      name: 'Lucas Moraes',
      role: 'Desenvolvedor Frontend'
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa.É um projeto que fiz no NLW Return, evento da Rocketseat.O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "👉 jane.design / doctorcare" },
    ],
    publishedAt: new Date('2023-07-02 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: `https://github.com/lucasearom.png`,
      name: 'Lucas Moraes',
      role: 'Desenvolvedor Frontend'
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa.É um projeto que fiz no NLW Return, evento da Rocketseat.O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "👉 jane.design / doctorcare" },
    ],
    publishedAt: new Date('2023-07-02 20:00:00')
  },
  {
    id: 3,
    author: {
      avatarUrl: `https://github.com/lucasearom.png`,
      name: 'Guilherme Machado Oliveira',
      role: 'Desenvolvedor Fullstack'
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa.É um projeto que fiz no NLW Return, evento da Rocketseat.O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "👉 jane.design / doctorcare" },
    ],
    publishedAt: new Date('2023-07-02 20:00:00')
  }
]

export function App() {
    return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
