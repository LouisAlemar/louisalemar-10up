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
          <p key={post.id}>{post.title.rendered}</p>
        )
      })}
    </main>
  )
}
