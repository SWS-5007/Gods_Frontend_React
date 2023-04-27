const uploadFile = async(files, url) => {
    var formData = new FormData();
  
    files.map((file, index) => {
      formData.append(`file${index}`, file);
    });
    
    var uploadUrl = process.env.REACT_APP_BASE_API_URL + url;
    console.log(uploadUrl);
    fetch(uploadUrl, {
      // content-type header should not be specified!
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(success => {
        // Do something with the successful response]
      })
      .catch(error => console.log(error)
    );
}

export default uploadFile;