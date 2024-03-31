import { BlockToolConstructable } from '@editorjs/editorjs';

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

const EditorTools = {
    header: {
        class: Header as unknown as BlockToolConstructable,
        config: {
                placeholder: "Header...",
        },
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

};

export default EditorTools;