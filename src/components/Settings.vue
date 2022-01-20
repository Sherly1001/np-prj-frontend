<template>
    <div class="settings">
        <div class="settings_title">Settings</div>
        <div class="settings_content">
            <div class="settings_option">
                <div class="settings_theme">
                    <p>Theme</p>
                    <select v-model="selected" @change="onChange()">
                        <option v-for="theme in themes" :key="theme.id" :value="theme.id">
                            {{ theme.name }}
                        </option>
                    </select>

                    <b-form-select v-model="selected" :options="themes"></b-form-select>
                    
                </div>
                <div class="settings_language">
                    <p>Language</p>
                    <select :selected="lang_seleted">
                        <!-- <option value="0">Select Themes</option> -->
                        <option v-for="lang in langs" :key="lang.id" :value="lang.id">
                            {{ lang.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    data() {
        return {
            selected: 0,
            lang_seleted: 0,
            themes: [
                {   
                    id: 0, 
                    name: "Default-Dark",
                    value: "dracula",
                },
                {   
                    id: 1, 
                    name: "Default-Light",
                    value: "chrome",
                },
                {   
                    id: 2, 
                    name: "Twilight (Dark)",
                    value: "twilight",
                },
                {   
                    id: 3, 
                    name: "Cobalt (Dark Blue)",
                    value: "cobalt",
                },
                {   
                    id: 4, 
                    name: "Solarized (Dark Green)",
                    value: "solarized_dark",
                },
                {   
                    id: 5, 
                    name: "Blue",
                    value: "tomorrow_night_blue",
                },
                {   
                    id: 6, 
                    name: "Grey",
                    value: "nord_dark",
                },
                {   
                    id: 7, 
                    name: "Idle fingers (Dark)",
                    value: "idle_fingers",
                },
                {   
                    id: 8, 
                    name: "Kuroir (Light)",
                    value: "kuroir",
                },
                {   
                    id: 9, 
                    name: "Cloud (Light)",
                    value: "crimson_editor",
                }
            ],
            langs: [
                {   
                    id: 0, 
                    name: "Javascript"
                },
            ],
        }
    },
    methods: {
        onChange() {
            // console.log(this.selected)
            const theme = this.themes.find((item) => item.id === this.selected )
            // console.log(theme)
            this.$emit('get-theme', theme)
        }
    }
}
</script>

<style scoped>
.settings {
    width: 20%;
    border: 1px solid #333;
    height: 300px;
    /* padding: 1em; */
    margin-top: 33px;
}

.settings_title {
    padding: 0.5em;
    font-weight: 600;
    background: #444959;
    color: #fff;
    font-size: 22px;
}

.settings_content {
    padding: 0.5em;
}

.settings_language {
    margin-top: 10px;
}
</style>