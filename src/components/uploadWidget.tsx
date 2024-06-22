import React, { useEffect, useRef } from 'react';
import useTweetStore from '../stores/Tweet';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';


const UploadWidget: React.FC = () => {
    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();
    const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string | null>(null);

    const { setImageUrl } = useTweetStore();

    useEffect(() => {
        if (!(window as any).cloudinary) {
            console.error("Cloudinary library is not loaded.");
            return;
        }

        cloudinaryRef.current = (window as any).cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'dnkyjj2ij',
                uploadPreset: 'ywkf89rv',
            },
            (error: any, result: any) => {
                if (error) {
                    console.error('Upload Error:', error);
                    return;
                }
                if (result && result.event === 'success') {
                    console.log('Done! Here is the image info: ', result.info);
                    setUploadedImageUrl(result.info.url);
                    setImageUrl(result.info.url);
                }
            }
        );
    }, []);

    return (
        <div>
            {!uploadedImageUrl && (
                <Button sx={{ mx: 2, mt: 2 }} onClick={() => widgetRef.current.open()} variant="contained" startIcon={<CloudUploadIcon />}>
                    画像アップロード
                </Button>
            )}
            <div>
                {uploadedImageUrl && (
                    <img src={uploadedImageUrl} alt="Uploaded Image" style={{ width: '250px', height: '250px', paddingTop: '12px', paddingLeft: '12px' }} />
                )}
            </div>
        </div>
    );
};

export default UploadWidget;