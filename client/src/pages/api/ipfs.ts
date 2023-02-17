// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type {Fields, Files , File} from "formidable"
import { fileFromPath, parseForm, uploadNftToIpfs } from '@/lib/nftstorage';

type ResponseData = {
    error: string | any   
    data: any
}

type FieldsType = { name: string, description: string, chain?:string, address:string }

export const config = {
    api: {
      bodyParser: false,
    },
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {    
    if(req.method === 'POST'){
        try {
            const [fields,files] = await parseForm(req) as [Fields, Files]
            const file = files.file as File                   
            if(!file) return res.status(400).json({error: 'missing file', data: null})            

            const {name, description} = fields as FieldsType
            if(!name || !description) return res.status(400).json({ error: 'missing metadata', data:null })
            const image = await fileFromPath(file)
            const metadata = await uploadNftToIpfs(name,description,image)
            return res.status(200).json({data: metadata?.url, error:null})
            
            
        } catch (error) {        
            return res.status(400).json({ error: 'internal server error' , data: null})        
        }        
    }
    return res.status(400).json({ error: 'unsupported method', data:null })        
    
}
