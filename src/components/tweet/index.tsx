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

const Tweet: React.FC<{ tweetData: TweetInterface }> = ({ tweetData }) => {
    const wsCtx = useContext(WebSocketContext);
    if (!wsCtx) {
        throw new Error('Context not found');
    }
    const { sendWS } = wsCtx;

    const { uid, isSignedIn } = UseUserStore();

    const [isShowingPost, setIsShowingPost] = useState(false);
    const [isShowingComment, setIsShowingComment] = useState(false);
    // const [isTransitionComplete, setIsTransitionComplete] = useState(false);
    // const [verticalMargin, setVerticalMargin] = useState(0.0);
    // const [isVisible, setIsVisible] = useState(true);
    const { setLinkUid } = UsePostStore();
    const { openNewTweet, openEditTweet, openSnack } = UseAppStore();
    const [backLinkedTweets, setBackLinkedTweets] = useState<TweetInterface[]>([]);
    const [frontLinkedTweets, setFrontLinkedTweets] = useState<TweetInterface[]>([]);

    const { tweets, tweetMapInstance, lastUpdatedUID } = UseFeedStore();

    const { setContent, setTweetUID } = UseTweetStore();
    // const { setBackLinkedTweets, setFrontLinkedTweets, getFrontLinks, getBackLinks, frontLinks, backLinks } = UseFeedStore();

    var tweet = tweets.filter((t) => t.uid === tweetData.uid)[0];

    const isUserOwner = tweet.ownerUID === uid;

    const handleEdit = () => {
        setTweetUID(tweet.uid);
        setContent(tweet.content);
        openEditTweet();
    }

    // useEffect(() => {
    // const animateMargin = (showing: boolean) => {
    //     let start = Date.now();
    //     let timer = setInterval(() => {
    //         let timePassed = Date.now() - start;
    //         let progress = timePassed / 300;
    //         if (progress > 1) progress = 1;

    //         // ease in-out effect
    //         let easeInOutProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

    //         setVerticalMargin(showing ? easeInOutProgress * 20 : (1 - easeInOutProgress) * 20);

    //         if (progress === 1) {
    //             setIsTransitionComplete(true);
    //             clearInterval(timer);
    //         };
    //     }, 20);
    // };

    // setIsTransitionComplete(false);
    // animateMargin(isShowingPost);
    // }, [isShowingPost])

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

        // const fetchAllBackLinkedTweetsSimultaneously = async () => {
        //     const startTime = performance.now();
        //     const fetchPromises = [];
        //     if (tweetData.linksBack) {
        //         for (let i = 0; i < 1000; i++) {
        //             fetchPromises.push(getLinkedTweets(sendWS, tweetData.linksBack));
        //             console.log(i);
        //         }
        //     }
        //     const allBackLinkedTweets = await Promise.all(fetchPromises);
        //     // Assuming we need to handle the results collectively
        //     const combinedBackLinkedTweets = allBackLinkedTweets.flat();
        //     console.log(combinedBackLinkedTweets);
        //     const endTime = performance.now();
        //     console.log(`Fetching all back linked tweets took ${endTime - startTime} milliseconds.`);
        // };
        // fetchAllBackLinkedTweetsSimultaneously();

        fetchLinkedTweets();
    }, []);

    // useEffect(() => {
    //     console.log("1111111111111111111111111", tweetsToUpdate)
    //     if (tweetsToUpdate.includes(tweet.uid)) {
    //         console.log("uuuuuuuuuuuuuuuuuuupdating");
    //         setIsVisible(false);
    //         setTimeout(() => {
    //             setIsVisible(true);
    //             removeTweetsToUpdate(tweet.uid);
    //         }, 10);
    //     }
    // }, [frontLinks, backLinks, tweetsToUpdate]);

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
                                    <Stack width="50%">
                                        <Link prev={true} tweet={backLinkedTweets[0]} />
                                    </Stack>
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
                                            setLinkUid(tweet.uid); openNewTweet()
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