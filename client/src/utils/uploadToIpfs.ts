export async function uploadToIpfs(formData: FormData) {
    try {
      const x = await fetch("/api/ipfs", { method: "POST", body: formData });
      const res = await x.json();    
      return res
    } catch (error: any) {
      return {error: error.message, data:null}    
    } 
}