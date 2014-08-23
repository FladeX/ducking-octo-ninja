var Site = {
    Models: {},
    Views: {},
    Collections: {}
};
Site.Models.Chapter = Backbone.Model.extend({
    defaults: chapters_data[1],
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
Site.Collections.Chapters = Backbone.Collection.extend({
    model: Site.Models.Chapter
});
Site.Views.ChaptersView = Backbone.View.extend({
    initialize: function() {
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.resetAll, this);
    },

    render: function() {
        this.resetAll();
    },

    addOne: function(chapter) {
        var chapterView = new Site.Views.ChapterView({ model: chapter });
        this.$el.append(chapterView.render().el);
    },

    resetAll: function() {
        this.$el.empty();
        this.collection.forEach(this.addOne, this);
    },
});

var chapters = new Site.Collections.Chapters();
var chaptersView = new Site.Views.ChaptersView({ collection: chapters });

$(document).ready(function(){
    chaptersView.render();
    $('.main').append(chaptersView.$el);
    for (var i = 1; i <=5; i++) {
        chapters.add( new Site.Models.Chapter(chapters_data[i]) );
    }
});