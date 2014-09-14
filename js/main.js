var Site = {
    Models: {},
    Views: {},
    Collections: {}
};
Site.Models.Chapter = Backbone.Model.extend({});
Site.Views.ChapterView = Backbone.View.extend({
    tagName: 'div',
    template: $('#chapterTemplate').html(),

    events: {
        'click .chapter__controls-icon_mode_add': 'addChapter',
        'click .chapter__controls-icon_mode_edit': 'editChapter',
        'click .chapter__controls-icon_mode_delete': 'deleteChapter',
        'click .chapter__editor-submit': 'saveChapter',
        'input .chapter__editor-title': 'changeChapter',
        'input .chapter__editor-content': 'changeChapter'
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
        var chapter = new Site.Models.Chapter({title: '', content: ''});
        chapters.add( chapter );
        $('.chapter__controls-icon_mode_edit:last').click();
        $('html, body').animate({
            scrollTop: $('.chapter__controls-icon_mode_edit:last').offset().top
        }, 1500);
    },
    editChapter: function() {
        var chapter = {
            title: this.model.get('title'),
            content: toMarkdown(this.model.get('content'))
        };
        this.$el.find('.chapter').addClass('chapter_mode_edit');
        this.$el.find('.chapter__editor-form .chapter__editor-title').val( chapter.title );
        this.$el.find('.chapter__editor-form .chapter__editor-content').html( chapter.content );
    },
    deleteChapter: function() {
        this.$el.remove();
    },
    saveChapter: function() {
        var chapter = {
            title: this.$el.find('.chapter__editor-title').val(),
            content: markdown.toHTML(this.$el.find('.chapter__editor-content').val())
        };
        this.model.set({
            title: chapter.title,
            content: chapter.content
        });
        this.$el.find('.chapter').removeClass('chapter_mode_edit');
        this.render();
        return false;
    },
    changeChapter: function() {
        var chapter = {
            title: '<h2 class="chapter__title">' + this.$el.find('.chapter__editor-title').val() + '</h2>',
            content: markdown.toHTML(this.$el.find('.chapter__editor-content').val())
        };
        this.$el.find('.chapter__content').html( chapter.title + chapter.content );
        return false;
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
    for (var i = 0; i < _.size(chapters_data); i++) {
        chapters.add( new Site.Models.Chapter(chapters_data[i]) );
    }
});
