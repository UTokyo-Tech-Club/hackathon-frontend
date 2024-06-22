import React, { useEffect, useState, useContext } from 'react';
import { WebSocketContext } from '../../websocket/websocket';
import { TweetInterface } from "../../interfaces/Tweet";
import Content from './Content';
import Link from './link';
import Metadata from './Metadata';
import FollowButton from '../profile/services/Follow';
import UseAppStore from '../../stores/App';
import UseTweetStore from '../../stores/Tweet';
import UseFeedStore from '../../stores/Feed';
import { getLinkedTweets } from './model';

// MUI
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import UseUserStore from '../../stores/User';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import UsePostStore from '../../stores/Post';
import Comments from './comment';

import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const Tweet: React.FC<{ tweetData: TweetInterface }> = ({ tweetData }) => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const { uid, isSignedIn } = UseUserStore();

    const [isShowingPost, setIsShowingPost] = useState(false);
    const [isShowingComment, setIsShowingComment] = useState(false);
    const { setLinkUid } = UsePostStore();
    const { openNewTweet, openEditTweet, openSnack } = UseAppStore();
    const [backLinkedTweets, setBackLinkedTweets] = useState<TweetInterface[]>([]);
    const [frontLinkedTweets, setFrontLinkedTweets] = useState<TweetInterface[]>([]);

    const { tweets, tweetMapInstance, lastUpdatedUID } = UseFeedStore();

    const { setContent, setTweetUID, setImageUrl } = UseTweetStore();

    var tweet = tweets.filter((t) => t.uid === tweetData.uid)[0];

    const isUserOwner = tweet.ownerUID === uid;

    const handleEdit = () => {
        setTweetUID(tweet.uid);
        setContent(tweet.content);
        openEditTweet();
    }


    useEffect(() => {
        if (tweetData.uid === lastUpdatedUID) {
            tweetMapInstance.get(tweet.uid)?.blocks.clear();
            tweetMapInstance.get(tweet.uid)?.blocks.insertMany(JSON.parse(tweet.content).blocks);
        }
    }, [tweets])

    useEffect(() => {
        const fetchLinkedTweets = async () => {
            if (tweetData.linksBack) {
                const uniqueLinksBack = Array.from(new Set(tweetData.linksBack));
                tweetData.linksBack = uniqueLinksBack;
                const backLinkedTweets = await getLinkedTweets(sendWS, tweetData.linksBack);
                setBackLinkedTweets(backLinkedTweets);
            }
            if (tweetData.linksFront) {
                const uniqueLinksFront = Array.from(new Set(tweetData.linksFront));
                tweetData.linksFront = uniqueLinksFront;
                const frontLinkedTweets = await getLinkedTweets(sendWS, tweetData.linksFront);
                setFrontLinkedTweets(frontLinkedTweets);
            }

        };


        fetchLinkedTweets();
    }, []);


    const handleMetadataAction = (action: string) => {
        if (action == 'comment') {
            setIsShowingPost(false);
            setIsShowingComment(!isShowingComment);
        }

        if (action == 'link') {
            setIsShowingPost(true);
            setIsShowingComment(false);
        }
    };

    const cld = new Cloudinary({ cloud: { cloudName: 'dnkyjj2ij' } });
    var img;

    // Use this sample image or upload your own via the Media Explorer
    try {

        const url = tweet.imageUrl;
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        const extractedPart = filename.split('.')[0];

        img = cld
            .image(extractedPart)
            .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
            .quality('auto')
            .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
    } catch (error) {
        console.log(error);
    }

    return (
        <>
            <Paper elevation={1} sx={{ my: 2 }} onClick={() => { setIsShowingPost(!isShowingPost), setIsShowingComment(false) }}>
                <Stack>
                    {/* Main Content */}
                    <Stack direction="row">

                        {/* Profile */}
                        <Avatar sx={{ width: 40, height: 40, m: 2 }} src={tweet.ownerPhotoURL} alt={tweet.ownerUsername} />


                        {/* Content */}
                        <Stack width="100%">

                            {/* Profile Info */}
                            <Stack direction="row" height={64}>
                                <Typography alignSelf="center" variant="body2">{tweet.ownerUsername}</Typography>
                                <Box display='flex' height={32} alignSelf='center' sx={{ ml: 2 }}>
                                    {!isUserOwner ?
                                        <FollowButton userToFollowUID={tweet.ownerUID} />
                                        :
                                        <Box onClick={(event) => event.stopPropagation()}>
                                            <IconButton onClick={handleEdit}>
                                                <EditIcon sx={{ height: 20, width: 20 }} />
                                            </IconButton>
                                        </Box>
                                    }
                                </Box>
                            </Stack>


                            {tweet.imageUrl !== '' && img && <AdvancedImage cldImg={img} width="250px" height="250px" />}


                            {/* Editor.js */}
                            <Box>
                                <Content tweetUID={tweet.uid} data={tweet.content} />
                            </Box>
                        </Stack>

                        {/* Metadata */}
                        <Box onClick={(event) => event.stopPropagation()}>
                            <Metadata tweet={tweet} onAction={handleMetadataAction} />
                        </Box>
                    </Stack>

                    {/* Comments */}
                    {isShowingComment && !isShowingPost &&
                        <>
                            <Divider variant="fullWidth" />
                            <Comments tweet={tweet} />
                        </>
                    }

                    {/* Links */}
                    <Divider variant="fullWidth" />
                    <Stack direction="row" width="100%">

                        {isShowingPost &&
                            <>
                                {backLinkedTweets.length > 0 &&
                                    backLinkedTweets.map((linkedTweet: any) => (
                                        <Stack width="50%" key={linkedTweet.uid}>
                                            <Link prev={true} tweet={linkedTweet} />
                                        </Stack>
                                    ))
                                }
                                {
                                    backLinkedTweets.length > 0 && frontLinkedTweets.length > 0 &&
                                    <Divider orientation='vertical' variant="fullWidth" flexItem />
                                }
                                <Stack width="50%">
                                    <Box onClick={(event) => event.stopPropagation()}>
                                        <Button variant="outlined" color="primary" sx={{ m: 1 }} onClick={() => {
                                            if (!isSignedIn) {
                                                openSnack("ログインしてください", "warning");
                                                return;
                                            }
                                            setImageUrl("");
                                            setLinkUid(tweet.uid);
                                            openNewTweet();
                                        }}>+ リンクして新規投稿</Button>
                                    </Box>
                                    {
                                        frontLinkedTweets.length > 0 &&

                                        <Link prev={false} tweet={frontLinkedTweets[0]} />
                                    }
                                </Stack>
                            </>
                        }

                        {!isShowingPost && !isShowingComment &&
                            <>
                                {backLinkedTweets.length > 0 && backLinkedTweets[0].content &&
                                    <Link prev={true} tweet={backLinkedTweets[0]} />
                                }
                                {backLinkedTweets.length > 0 && frontLinkedTweets.length > 0 &&
                                    <Divider orientation='vertical' variant="fullWidth" flexItem />
                                }
                                {frontLinkedTweets.length > 0 && frontLinkedTweets[0].content &&
                                    <Link prev={false} tweet={frontLinkedTweets[0]} />
                                }
                            </>
                        }

                    </Stack>
                </Stack>
            </Paper>
            {/* <Box sx={{ my: verticalMargin }} /> */}
        </>
    );
}

export default Tweet;