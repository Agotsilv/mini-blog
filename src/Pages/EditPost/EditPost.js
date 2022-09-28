// import styles from "./EditPost.module.css";

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuthValue } from "../../Context/AuthContext";
// import { useUpdateDocument } from "../../hooks/useUpdateDocument";

// import { useFetchDocument } from "../../hooks/useFetchDocument";

// const EditPost = () => {
//   const {id} =useParams()
// const {document: post} = useFetchDocument("posts", id)

//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState("");
//   const [body, setBody] = useState("");
//   const [tags, setTags] = useState([]);
//   const [formError, setFormError] = useState("");

//   useEffect(() =>{
//     if(post){
//       setTitle(post.title)
//       setBody(post.body)
//       setImage(post.image)

//       const textTags = post.tagsArray.join(",")

//       setTags(textTags)
//     }
//   })

//   const navigate = useNavigate();

//   const { updateDocument, response } = useUpdateDocument("posts");

//   const { user } = useAuthValue();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormError("");

//     // validar url
//     try {
//       new URL(image);
//     } catch (error) {
//       setFormError("A imagem precisa ser uma URL.");
//     }

//     //array tags
//     const tagsArray = tags.split(",").map((tags) => tags.trim().toLowerCase());
//     //checar valores

//     if (!title || !image || !tags || !body) {
//       setFormError("Por favor, preencha todos os campos");
//     }

//     if (formError) return;

//     updateDocument({
//       title,
//       image,
//       body,
//       tagsArray,
//       uid: user.uid,
//       createdBy: user.displayName,
//     });
//     // redirect to home page

//     navigate("/dashboard");
//   };

//   return (
//     <div className={styles.edit_post}>
//       {post && (
//         <>
//            <h2>Editando posts: {post.title}</h2>
//       <p>Altera os dados como desejar!</p>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <span>Título:</span>
//           <input
//             type="text"
//             name="title"
//             required
//             placeholder="Título"
//             onChange={(e) => setTitle(e.target.value)}
//             value={title}
//           />
//         </label>
//         <label>
//           <span>URL da imagem:</span>
//           <input
//             type="text"
//             name="image"
//             required
//             placeholder="imagem"
//             onChange={(e) => setImage(e.target.value)}
//             value={image}
//           />
//         </label>
//         <p className={styles.preview_title}>Preview da imagem</p>
//         <img className={styles.image_preview} src={post.image} alt={post.title} />
//         <label>
//           <span>Texto:</span>
//           <textarea
//             name="body"
//             required
//             placeholder="Conteudo do post"
//             onChange={(e) => setBody(e.target.value)}
//             value={body}
//           />
//         </label>
//         <label>
//           <span>Tags: </span>
//           <input
//             type="text"
//             name="tags"
//             required
//             placeholder="tags"
//             onChange={(e) => setTags(e.target.value)}
//             value={tags}
//           />
//         </label>

//         {!response.loading && <button className="btn">Editar</button>}
//         {response.loading && (
//           <button className="btn" disable>
//             Aguarde...
//           </button>
//         )}
//         {response.error && <p className="error">{response.error}</p>}
//         {formError && <p className="error">{formError}</p>}
//       </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default EditPost;

import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../Context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  console.log(post);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  //  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // fill form data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
    }
  }, [post]);

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    // const tagsArray = tags.split(",").map((tag) => tag.trim());

    // console.log(tagsArray);

    console.log({
      title,
      image,
      body,
    });

    const data = {
      title,
      image,
      body,
    };

    console.log(post);

    updateDocument(id, data);

    // redirect to home page
    navigate("/dashboar");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="text"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            {/* <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label> */}
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
