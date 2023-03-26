import { useRef } from 'react';
import Layout from '../../components/Layout';

export default function Write() {
  const idRef = useRef(undefined);
  const titleRef = useRef(undefined);
  const contentRef = useRef(undefined);

  const handleSubmit = () => {
    event.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Fetch Error');
        })
        .then((data) => alert(data.message))
        .catch((error) => alert(`request error: ${error}`));
    }
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="id"
          required
          ref={idRef}
        ></input>
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        ></input>
        <br />
        <textarea
          type="text"
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        ></textarea>
        <br />
        <input type="submit" value="Create"></input>
      </form>
    </Layout>
  );
}
