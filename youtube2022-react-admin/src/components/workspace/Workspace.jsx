import React, { useEffect, useState } from "react";
import { Searchtab } from "../searchtab/Searchtab";
import "./workspace.scss";
import axios from "axios";

export const Workspace = () => {
  const [image, setImage] = useState("");
  const [allImage, setAllImage] = useState([]);
  const [finalimag, setfinalimag] = useState("");
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    console.log(allImage);
  }, [allImage]);

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photo", selectedFile);
      try {
        console.log("nice");
        const response = await axios
          .post("http://localhost:8000/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            localStorage.getItem("token", response.data.token);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.token}`;
            console.log(response);
            setAllImage([...allImage, { src: response.data.photo }]);
          });
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("what?");
    }
  };

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.log("error", error);
    };
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  function getImage() {
    const response = axios
      .get("http://localhost:8000/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.getItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        console.log(response);
        setAllImage(response.data.body);
      });
  }
  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="workspace">
      <div className="searchtab">
        <Searchtab />
      </div>

      <a href="/ImageComments">COMMENTS</a>

      <div className="mainsection" style={{ width: "auto" }}>
        <input
          accept="image/*"
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        {image == "" || image == null ? (
          ""
        ) : (
          <img width={100} height={100} src={image} />
        )}

        <button onClick={handleUpload}>Upload</button>

        {allImage.map((data, key) => {
          return <img width={100} height={100} src={data.photo} />;
        })}
      </div>
    </div>
  );
};
