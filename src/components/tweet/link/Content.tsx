import React, { useEffect, useRef } from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import EditorTools from '../../../utils/editor/EditorTools';
import UseFeedStore from '../../../stores/Feed';
//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore
import LinkTool from "@editorjs/link";
//@ts-ignore
import ListTool from "@editorjs/list";
//@ts-ignore
import SimpleImageTool from "@editorjs/simple-image";
//@ts-ignore
import ParagraphTool from "@editorjs/paragraph";
//@ts-ignore
import RawTool from "@editorjs/raw";
//@ts-ignore
import CodeTool from "@editorjs/code";
//@ts-ignore
import EmbedTool from "@editorjs/embed";
//@ts-ignore
import QuoteTool from "@editorjs/quote";
//@ts-ignore
import WarningTool from "@editorjs/warning";
//@ts-ignore
import TableTool from "@editorjs/table";
//@ts-ignore
import MarkerTool from "@editorjs/marker";
//@ts-ignore
import InlineCodeTool from "@editorjs/inline-code";
//@ts-ignore
import DelimiterTool from "@editorjs/delimiter";
//@ts-ignore
import ChecklistTool from "@editorjs/checklist";
//@ts-ignore
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";

const Content: React.FC<{ tweetUID: string, data: string }> = ({ tweetUID, data }) => {
    const ejInstance = useRef<EditorJS | null>(null);

    const { addTweetMapInstance } = UseFeedStore();

    useEffect(() => {
        if (!ejInstance.current) {
            const editorConfig: EditorConfig = {
                readOnly: true,
                defaultBlock: "embed",
                holder: tweetUID,
                minHeight: 10,
                tools: EditorTools,
                data: JSON.parse(data),

                onReady: () => {
                    if (ejInstance.current) {
                        addTweetMapInstance(tweetUID, ejInstance.current);
                    }
                },
                onChange: async () => {
                },

            };

            const editor = new EditorJS(editorConfig);

            ejInstance.current = editor;
        }

    }, []);

    return <div id={tweetUID}></div>;
};

export default Content