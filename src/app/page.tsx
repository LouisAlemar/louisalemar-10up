import Image from 'next/image'
import styles from './page.module.css'

async function getData() {
  const res = await fetch(`http://louisalemar-10up.local/wp-json/wp/v2/posts`)
  const data = await res.json()

  if (!data) {
    throw new Error("Failed to fetch data from wordpress")
  }

  return data
}

export default async function Home() {
  const data = await getData()

  return (
    <main className={styles.main}>
      {data.map((post: any) => {
        return (
          <div key={post.id}>
            <h1>{post.title.rendered}</h1>
          </div>
        )
      })}
    </main>
  )
}
