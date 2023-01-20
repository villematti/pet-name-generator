import Head from "next/head"
import { FormEvent, useState } from "react"
import styles from './index.module.css';

export default function Home() {

  const [ animal, setAnimal ] = useState<string>('');
  const [ result, setResult ] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal })
      });
  
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      } else {
        setResult(data.result);
        setAnimal('');
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>
          Create Next App
        </title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <img src="/favicon.ico" className={styles.icon} />
        <h1>Name my pet</h1>
        <form onSubmit={async (e) => await handleSubmit(e)}>
          <input 
            type="text"
            value={animal ?? ''}
            onChange={(e) => setAnimal(e.target.value)}
            placeholder="Enter an animal"
          />
          <input 
            type="submit"
            value="Generate names"
          />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </>
  )
}
