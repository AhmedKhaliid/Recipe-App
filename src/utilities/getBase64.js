
export const getBase64 = (selectedFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            const base64Image = reader.result.split(",")[1];
            resolve(base64Image);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};
