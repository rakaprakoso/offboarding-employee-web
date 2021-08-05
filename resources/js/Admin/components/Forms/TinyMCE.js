import React, { useRef } from 'react'
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

const TinyMCEForm = (props) => {
    const name = props.name;
    const value = props.value;

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    var editor_config = {
        height: 800,
        path_absolute: "/",
        selector: "textarea.my-editor",
        menubar: false,
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table directionality",
            "emoticons template paste textpattern"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat code | help",
        relative_urls: false,
        file_picker_callback: function (callback, value, meta) {
            var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
            var y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

            var cmsURL = editor_config.path_absolute + 'filemanager?editor=' + meta.fieldname;
            if (meta.filetype == 'image') {
                cmsURL = cmsURL + "&type=Images";
            } else {
                cmsURL = cmsURL + "&type=Files";
            }

            tinyMCE.activeEditor.windowManager.openUrl({
                url: cmsURL,
                title: 'Filemanager',
                width: x * 0.8,
                height: y * 0.8,
                resizable: "yes",
                close_previous: "no",
                onMessage: (api, message) => {
                    callback(message.content);
                }
            });
        },
        image_class_list: [
            { title: 'None', value: '' },
            { title: 'Claim Logo', value: 'img_claim' },
        ]
    };

    return (
        <TinyMCE
            textareaName={name}
            tinymceScriptSrc="/vendor/tinymce/tinymce.min.js"
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={value}
            init={editor_config
                // {
                //     height: 500,
                //     menubar: false,
                //     plugins: [
                //         'advlist autolink lists link image charmap print preview anchor',
                //         'searchreplace visualblocks code fullscreen',
                //         'insertdatetime media table paste code help wordcount'
                //     ],
                //     toolbar: 'undo redo | formatselect | ' +
                //         'bold italic backcolor | alignleft aligncenter ' +
                //         'alignright alignjustify | bullist numlist outdent indent | ' +
                //         'removeformat code | help',
                // }
            }
        />
    )
}

export default TinyMCEForm
