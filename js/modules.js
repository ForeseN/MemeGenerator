'use strict'

function renderModuleText() {
    document.querySelector('.tab-container').innerHTML = `
    <div class="text-module">
        <input type="text" name="" id="add-text-input" class="add-text-input"
            placeholder="When you realize...">
        <button class="btn round-btn add-text-btn" onclick="onAddText()">Add Text</button>
        <div class="font-area">
            <label for="font" class="text-white">Font</label>
            <select class="form-control">
                <option>Impact</option>
                <option>Arial</option>
            </select>
            <select class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <div class="font-buttons">
                <button class="btn" onclick="onBold()"><i class="fa-solid fa-bold"></i></button>
                <button class="btn" onclick="onItalic()"><i class="fa-solid fa-italic"></i></button>
                <button class="btn" onclick="onUnderline()"><i
                        class="fa-solid fa-underline"></i></button>
                <button class="btn" onclick="onAlignLeft()"><i
                        class="fa-solid fa-align-left"></i></button>
                <button class="btn" onclick="onAlignCenter()"><i
                        class="fa-solid fa-align-justify"></i></button>
                <button class="btn" onclick="onAlignRight()"><i
                        class="fa-solid fa-align-right"></i></button>
            </div>
            <div class="font-colors">
                <div class="flex justify-space-between align-items-center">
                    <label for="text-color" class="text-white">Text Color</label>
                    <input type="color" name="" id="text-color" value="#FFFFFF"
                        oninput="onTextColorChange(this.value)">
                </div>
                <div class="flex justify-space-between align-items-center">

                    <label for="text-outline" class="text-white">Text Outline</label>
                    <input type="color" name="" id="text-outline"
                        oninput="onTextOutlineColorChange(this.value)">
                </div>
            </div>
            <button class="btn round-btn default">Default Settings</button>
        </div>
    </div>
    `
}
