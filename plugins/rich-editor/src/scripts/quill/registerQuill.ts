/**
 * @author Adam (charrondev) Charron <adam.c@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

// Quill Built-ins
import Quill from "quill/core";
import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Link from "quill/formats/link";
import Strike from "quill/formats/strike";
import List, { ListItem } from "quill/formats/list";
import Header from "quill/formats/header";
import { IndentClass as Indent } from "quill/formats/indent";

// Custom Inline Blots
import CodeInlineBlot from "./blots/inline/CodeBlot";

// Custom Embed Blots
import EmojiBlot from "./blots/embeds/EmojiBlot";
import ExternalEmbedBlot from "./blots/embeds/ExternalEmbedBlot";
import EmbedErrorBlot from "./blots/embeds/ErrorBlot";
import MentionBlot from "./blots/embeds/MentionBlot";
import MentionComboBoxBlot from "./blots/embeds/MentionComboBoxBlot";
import MentionAutoCompleteBlot from "./blots/embeds/MentionAutoCompleteBlot";

// Custom Block Blots
import BlockBlot from "./blots/blocks/BlockBlot";
import SpoilerLineBlot, { SpoilerWrapperBlot, SpoilerContentBlot } from "./blots/blocks/SpoilerBlot";
import BlockquoteLineBlot, { BlockquoteWrapperBlot, BlockquoteContentBlot } from "./blots/blocks/BlockquoteBlot";
import CodeBlockBlot from "./blots/blocks/CodeBlockBlot";

// Custom Modules/Themes
import VanillaTheme from "./VanillaTheme";
import FocusModule from "./FocusModule";
import EmbedInsertionModule from "./EmbedInsertionModule";
import HistoryModule from "./HistoryModule";
import ClipboardModule from "./ClipboardModule";
import LoadingBlot from "./blots/embeds/LoadingBlot";

export default function registerQuill() {
    Quill.register(
        {
            // Block formats
            "blots/block": BlockBlot,
            "formats/blockquote/line": BlockquoteLineBlot,
            "formats/blockquote/content": BlockquoteContentBlot,
            "formats/blockquote/wrapper": BlockquoteWrapperBlot,
            "formats/spoiler/line": SpoilerLineBlot,
            "formats/spoiler/content": SpoilerContentBlot,
            "formats/spoiler/wrapper": SpoilerWrapperBlot,
            "formats/codeBlock": CodeBlockBlot,
            "formats/header": Header,
            "formats/list": List,
            "formats/list/item": ListItem,
            "formats/embed-error": EmbedErrorBlot,
            "formats/embed-loading": LoadingBlot,
            "formats/embed-external": ExternalEmbedBlot,
            "formats/mention": MentionBlot,
            "formats/mention-combobox": MentionComboBoxBlot,
            "formats/mention-autocomplete": MentionAutoCompleteBlot,

            // Inline formats
            "formats/bold": Bold,
            "formats/codeInline": CodeInlineBlot,
            "formats/italic": Italic,
            "formats/link": Link,
            "formats/strike": Strike,
            "formats/emoji": EmojiBlot,

            // Other
            "formats/indent": Indent,
            "themes/vanilla": VanillaTheme,
            "modules/embed/insertion": EmbedInsertionModule,
            "modules/embed/focus": FocusModule,
            "modules/history": HistoryModule,
            "modules/clipboard": ClipboardModule,
        },
        true,
    );

    // Ensure the InlineCodeBlock is the outermost when formats are nested.
    const inlineFormatBlots = [
        "blots/inline",
        "formats/bold",
        "formats/italic",
        "formats/strike",
        "formats/link",
        "formats/codeInline",
    ];

    inlineFormatBlots.forEach(blotLookup => {
        const BlotClass = Quill.import(blotLookup);
        BlotClass.order = [...BlotClass.order, CodeInlineBlot.blotName];
    });

    // The inline blot needs its order changed
    const blotsAllowingMentionComboBox = [
        "blots/block",
        "formats/list/item",
        "formats/header",
        "formats/bold",
        "formats/italic",
        "formats/strike",
    ];

    blotsAllowingMentionComboBox.forEach(blotLookup => {
        const BlotClass = Quill.import(blotLookup);
        BlotClass.allowedChildren = [...BlotClass.allowedChildren, MentionComboBoxBlot];
    });
}
