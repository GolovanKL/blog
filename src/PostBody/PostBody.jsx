import React, { useEffect } from 'react';
import axios from "axios";

const PostBody = ({slug}) => {

  useEffect(() => {
    axios(`https://conduit.productionready.io/api/articles/${slug}`)
      .then(res => console.log(res.data))
  })


  return (
    <div>

    </div>
  );
};

export default PostBody;
