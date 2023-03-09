import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Bored and Yachting</title>
        <meta name="description" content="" />
      </Head>
      <main className={styles.main}>
          Home page
      </main>
    </>
  )
}
