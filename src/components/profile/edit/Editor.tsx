import React, { useEffect, useRef } from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { v4 as uuidv4 } from 'uuid';
import log from 'loglevel';
import UseProfileStore from '../../../stores/Profile';
import EditorTools from '../../../utils/editor/EditorTools';

const Editor: React.FC = () => {
    
    const ejInstance = useRef<EditorJS | null>(null);

    const uid = uuidv4();

    const { content, setContent } = UseProfileStore();

    useEffect(() => {
        if (ejInstance.current) return;

        const editorConfig: EditorConfig = {
            holder: uid,
            defaultBlock: "paragraph",
            minHeight: 10,
            tools: EditorTools,
            data: JSON.parse(content),
            onReady: () => {
            },
            onChange: async () => {
                if (ejInstance.current) {
                    let saved = await ejInstance.current.save();
                    setContent(JSON.stringify(saved));
                    return;
                }
                log.error('Editor.js instance is not available');
            },

        };

        const editor = new EditorJS(editorConfig);
        ejInstance.current = editor;
    }, []);

    const style = {
        width: '93%',
    };

    return <div id={uid} style={style}></div>;
};

export default Editor