import type { NextApiRequest, NextApiResponse } from 'next'
import { NFTStorage, File as NFTStorage_File,  } from 'nft.storage'
import formidable from "formidable";
import fs from 'fs';
import path from 'path'
const API_KEY = process.env.NFTSTORAGE_APIKEY as string


// formidable
const options: formidable.Options = {
    filter: ({name, originalFilename, mimetype}: any) => {
        return mimetype && mimetype.includes("image")
    },
    // maxFileSize:20 * 1024 * 1024
}
export const parseForm = async (req:NextApiRequest) => new Promise((resolve, reject) => new formidable.IncomingForm(options).parse(req, (err, fields, files) => err ? reject(err) : resolve([fields, files])))

//nft storage
export async function fileFromPath(file: formidable.File) {
    const content = await fs.promises.readFile(file.filepath)    
    return new NFTStorage_File([content], file.originalFilename || path.basename(file.filepath), { type: file.mimetype } as any)
}

export const uploadNftToIpfs = async (name:string, description: string, image:NFTStorage_File) => {
    try {
        const nftstorage = new NFTStorage({ token: API_KEY })
        const metadata = await nftstorage.store({
            name:name,
            description:description,
            image: image,            
        })
        
        return metadata
    } catch (error: any) {
        if(error.code === 1009){
            throw Error("File is too big")
        }
    }
}
