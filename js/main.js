var Site = {
    Models: {},
    Views: {},
    Collections: {}
};
Site.Models.Chapter = Backbone.Model.extend({
    defaults: chapters[1],
});
Site.Views.ChapterView = Backbone.View.extend({
    tagName: 'div',
    template: $('#chapterTemplate').html(),

    events: {
        'click .chapter__controls-icon_mode_add': 'addChapter',
        'click .chapter__controls-icon_mode_edit': 'editChapter',
        'click .chapter__controls-icon_mode_delete': 'deleteChapter',
        'click .chapter__editor-submit': 'saveChapter'
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    },

    addChapter: function() {
        console.log('add chapter');
    },
    editChapter: function() {
        console.log('edit chapter');
    },
    deleteChapter: function() {
        console.log('delete chapter');
    },
    saveChapter: function() {
        console.log('save chapter');
    }
});

var chapter1 = new Site.Models.Chapter( chapters[1] );
var chapterView = new Site.Views.ChapterView({ model: chapter1 });

$(document).ready(function(){
    chapterView.render();
    $('.main').append(chapterView.$el);
});
