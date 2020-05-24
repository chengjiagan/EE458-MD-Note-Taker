'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'underscore'

Vue.use(Vuex)

class Item {
    constructor(name, key, isDir, parent = "root") {
        this.name = name;
        this.key = key;
        this.isDir = isDir;
        this.parent = parent;
    }

    toTreeNode(items) {
        let node = {
            title: this.name,
            key: this.key,
        }

        if (this.isDir) {
            let children = _.filter(items, (e) => e.parent == this.key);
            children = _.map(children, (e) => e.toTreeNode());
            node.children = children;
        } else {
            node.isLeaf = true;
        }

        return node;
    }
}

class Directory extends Item {
    constructor(name, key, parent = "root") {
        super(name, key, true, parent);
    }
}

class Note extends Item {
    constructor(name, key, content, lastChange, tags, parent) {
        super(name, key, false, parent);
        this.content = content;
        this.lastChange = lastChange;
        this.tags = tags;
    }

    haveKeyword(keyword) {
        return this.name.indexOf(keyword) != -1 || this.content.indexOf(keyword) != -1 || this.tags.some((t) => t.indexOf(keyword) != -1);
    }
}

const items = {
    "1": new Directory("Notebook One", "1", "root"),
    "1-1": new Note("Note 1", "1-1", "", new Date(), ["happy"], "1"),
    "1-2": new Note("Note 2", "1-2", "", new Date(), ["unhappy"], "1"),
    "1-3": new Note("Note 3", "1-3", "", new Date(), ["happy"], "1"),
    "2": new Directory("Notebook Two", "2", "root"),
    "2-1": new Note("Note 4", "2-1", "", new Date(), ["tag 1", "tag 2"], "2"),
    "3": new Directory("Notebook Three", "3", "root"),
    "3-1": new Directory("Sub Dir", "3-1", "3")
};

const tags = ["happy", "unhappy", "tag 1", "tag 2", "empty"];

export default new Vuex.Store({
    state: {
        currentTab: "dir",
        items,
        tags,
        currentNote: ""
    },
    getters: {
        dirTree(state) {
            return _.filter(
                state.items,
                (e) => e.parent === "root").map(
                    (e) => e.toTreeNode(state.items));
        },
        tagTree(state) {
            return state.tags.map((t) => {
                let children = _.filter(state.items, (e) => {
                    return e.tags && e.tags.indexOf(t) !== -1;
                }).map((e) => {
                    return {
                        title: e.name,
                        key: e.key,
                        isLeaf: true
                    }
                });

                return {
                    title: t,
                    key: t,
                    children
                };
            });
        }
    },
    mutations: {
        changeTab(state, tab) {
            state.currentTab = tab;
        },
        changeName(state, { key, name }) {
            state.items[key].name = name;
        },
        addNoteTag(state, { key, tag }) {
            if (state.tags.indexOf(tag) == -1) {
                state.tags = [
                    ...state.tags,
                    tag
                ]
            }
            state.items[key].tags = [
                ...state.items[key].tags,
                tag
            ]
        },
        removeNoteTag(state, { key, tag }) {
            state.items[key].tags =
                state.items[key].tags.filter((t) => t != tag);
        },
        openNote(state, key) {
            if (!state.items[key].isDir) {
                state.currentNote = key;
                state.currentTab = 'edit';
            }
        },
        saveNote(state, {key, content}) {
            state.items[key].content = content;
        },
        changeNoteParent(state, {key, parent}) {
            console.log(key, parent);
            state.items[key].parent = parent;
        },
        addNote(state, {key, parent}) {
            Vue.set(state.items, key,
                new Note('Untitle Note', key, "", new Date(), [], parent));
        },
        addDir(state, {key, parent}) {
            Vue.set(state.items, key,
                new Directory('Untitle Dir', key, parent));
        },
        removeItem(state, key) {
            let new_items = {}
            for (let k in state.items) {
                let e = state.items[k];
                if (e.key != key && e.parent != key) {
                    new_items[k] = e;
                }
            }
            state.items = new_items;
        },
        addTag(state, tag) {
            state.tags = [
                ...state.tags,
                tag
            ];
        },
        removeTag(state, tag) {
            state.tags = state.tags.filter((t) => t != tag);
            for (let k in state.items) {
                let e = state.items[k];
                if (!e.isDir) {
                    e.tags = e.tags.filter((t) => t != tag);
                }
            }
        }
    }
})