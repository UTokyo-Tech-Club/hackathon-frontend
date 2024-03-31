import React, { useEffect, useRef } from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { v4 as uuidv4 } from 'uuid';
import log from 'loglevel';
import UsePostStore from '../../../stores/Post';
import EditorTools from '../../../utils/editor/EditorTools';

const DEFAULT_INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
        {
            type: "paragraph",
            data: {
                text: "",
            },
            config: {
                placeholder: "Write...",
            }
            // hint: "Write...",
        },
    ],
};

const Editor: React.FC = () => {
    const ejInstance = useRef<EditorJS | null>(null);

    const uid = uuidv4();

    const { setContent } = UsePostStore();

    useEffect(() => {
        if (ejInstance.current) return;

        const editorConfig: EditorConfig = {
            holder: uid,
            autofocus: true,
            defaultBlock: "paragraph",
            minHeight: 10,
            tools: EditorTools,
            data: DEFAULT_INITIAL_DATA,
            onReady: () => {
            },
            onChange: async () => {
                if (ejInstance.current) {
                    let saved = await ejInstance.current.save();
                    setContent(JSON.stringify(saved));
                    return
                }
                log.error('Editor.js instance is not available')
            },
        };

        const editor = new EditorJS(editorConfig);
        ejInstance.current = editor;
    }, []);

    const style = {
        width: '100%',
    }

    return <div id={uid} style={style}></div>;
};

export default Editor