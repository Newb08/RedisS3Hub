import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
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

export const deleteObjectURL = async (userKey) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: 'mehul-private-bucket',
            Key: `uploads/${userKey}.jpg`,
        });
        await s3Client.send(command);
        console.log(`Image deleted from S3`);
        return true;
    } catch (error) {
        console.error(`Error deleting image ${userKey}.jpg from S3`, error);
        return false;
    }
};

export const putObjectURL = async (filename, contentType) => {
    const command = new PutObjectCommand({
        Bucket: 'mehul-private-bucket',
        Key: `uploads/${filename}`,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 120 });
    return url;
};
