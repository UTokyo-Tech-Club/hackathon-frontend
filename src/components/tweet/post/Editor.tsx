import React, { useEffect, useRef } from 'react';
import EditorJS, { EditorConfig, BlockToolConstructable } from '@editorjs/editorjs';
import { v4 as uuidv4 } from 'uuid';
import log from 'loglevel';
import UsePostStore from '../../../stores/Post';
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

interface CustomHeaderConfig {
    placeholder?: string;
}

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
        if (!ejInstance.current) {
            // Define the editor configuration with the correct type
            const editorConfig: EditorConfig = {
                holder: uid,
                autofocus: true,
                defaultBlock: "paragraph",
                minHeight: 10,
                tools: {
                    header: {
                        class: Header as unknown as BlockToolConstructable,
                        config: {
                                placeholder: "Header...",
                            } as CustomHeaderConfig,
                        inlineToolbar: true,
                        tunes: ["textAlignment"],
                    },
                    list: {
                        class: ListTool,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        },
                        tunes: ['textAlignment'],
                    },

                    paragraph: {
                        class: ParagraphTool,
                        inlineToolbar: true,
                        tunes: ["textAlignment"],
                        config: {
                            placeholder: "Write...",
                        },
                    },

                    // raw: RawTool,
                    code: CodeTool,
                    embed: EmbedTool,
                    quote: QuoteTool,
                    warning: WarningTool,
                    table: TableTool,
                    marker: MarkerTool,
                    inlineCode: InlineCodeTool,
                    delimiter: DelimiterTool,
                    checklist: ChecklistTool,
                    textAlignment: {
                        class: AlignmentTuneTool,
                        config: {
                            default: "left",
                            blocks: {
                                header: "left",
                                list: "left",
                            },
                        }, 
                    },
                },
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

                data: DEFAULT_INITIAL_DATA
            };

            const editor = new EditorJS(editorConfig);

            ejInstance.current = editor;
        }

        // Cleanup function to destroy the editor when the component unmounts
        // return () => {
        //     if (ejInstance.current) {
        //         ejInstance.current.destroy();
        //         ejInstance.current = null;
        //     }
        // };
    }, []);

    const style = {
        width: '100%',
    }

    return <div id={uid} style={style}></div>;
};

export default Editor