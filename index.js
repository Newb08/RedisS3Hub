import { S3Client, GetObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AccessKey,
        secretAccessKey: process.env.SecretKey,
    },
});

// const getObjectURL = async (key) => {
//     const command = new GetObjectCommand({
//         Bucket: 'mehul-private-bucket',
//         Key: key,
//     });
//     const url = await getSignedUrl(s3Client, command);
//     return url;
// };

export const putObjectURL = async (filename, contentType) => {
    const command = new PutObjectCommand({
        Bucket: 'mehul-private-bucket',
        Key: `uploads/${filename}`,
        ContentType: contentType 
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
};


