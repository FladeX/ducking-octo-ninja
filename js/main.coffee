Site =
    Models: {}
    Views: {}
    Collections: {}
Site.Models.Chapter = Backbone.Model.extend({})
Site.Views.ChapterView = Backbone.View.extend
    tagName: 'div'
    className: 'chapter clearfix'
    template: $('#chapterTemplate').html()

    events:
        'click .chapter__controls-icon_mode_add': 'addChapter'
        'click .chapter__controls-icon_mode_edit': 'editChapter'
        'click .chapter__controls-icon_mode_delete': 'deleteChapter'
        'click .chapter__editor-submit': 'saveChapter'
        'input .chapter__editor-title': 'changeChapter'
        'input .chapter__editor-content': 'changeChapter'

    initialize: -> this.render()

    render: ->
        tmpl = _.template(this.template)
        this.$el.html(tmpl(this.model.toJSON()))
        this

    addChapter: ->
        chapter = new Site.Models.Chapter
            title: ''
            content: ''
        chapters.add( chapter )
        $('.chapter__controls-icon_mode_edit:last').click()
        $('html, body').animate
            scrollTop: $('.chapter__controls-icon_mode_edit:last').offset().top
        , 1000

    editChapter: ->
        chapter =
            title: this.model.get('title')
            content: toMarkdown(this.model.get('content'))

        $chapter = this.$el
        if !$chapter.hasClass('chapter_mode_edit')
            $chapter.find('.chapter__content').css
                position: 'relative'
            .animate
                right: '-50%'
                width: '50%'
            , 500, ->
                $chapter.find('.chapter__content').css
                    position: 'static'
                $chapter.find('.chapter__editor-form').animate
                    opacity: 1
                , 500
            $chapter.find('.chapter__editor-form').animate
                display: 'block'
                opacity: 0
            , 500, ->
                $chapter.addClass('chapter_mode_edit')

        $chapter.find('.chapter__editor-form .chapter__editor-title').val( chapter.title )
        $chapter.find('.chapter__editor-form .chapter__editor-content').html( chapter.content )

    deleteChapter: -> this.$el.remove()

    saveChapter: ->
        chapter =
            title: this.$el.find('.chapter__editor-title').val()
            content: markdown.toHTML(this.$el.find('.chapter__editor-content').val())
        this.model.set
            title: chapter.title
            content: chapter.content
        this.$el.removeClass('chapter_mode_edit')
        this.render()
        false

    changeChapter: ->
        chapter =
            title: '<h2 class="chapter__title">' + this.$el.find('.chapter__editor-title').val() + '</h2>'
            content: markdown.toHTML(this.$el.find('.chapter__editor-content').val())
        this.$el.find('.chapter__content').html( chapter.title + chapter.content )
        false

Site.Collections.Chapters = Backbone.Collection.extend
    model: Site.Models.Chapter

Site.Views.ChaptersView = Backbone.View.extend
    initialize: ->
        this.collection.on('add', this.addOne, this)
        this.collection.on('reset', this.resetAll, this)

    render: ->
        this.resetAll()

    addOne: (chapter) ->
        chapterView = new Site.Views.ChapterView
            model: chapter
        this.$el.append(chapterView.render().el)

    resetAll: ->
        this.$el.empty()
        this.collection.forEach(this.addOne, this)

chapters = new Site.Collections.Chapters()
chaptersView = new Site.Views.ChaptersView
    collection: chapters

$(document).ready ->
    chaptersView.render()
    $('.main').append(chaptersView.$el)
    chapters.add( new Site.Models.Chapter( chapter_data )) for chapter_data in chapters_data
