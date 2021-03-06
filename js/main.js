(function() {
  var Site, chapters, chaptersView;

  Site = {
    Models: {},
    Views: {},
    Collections: {}
  };

  Site.Models.Chapter = Backbone.Model.extend({});

  Site.Views.ChapterView = Backbone.View.extend({
    tagName: 'div',
    className: 'chapter clearfix',
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
      return this.render();
    },
    render: function() {
      var tmpl;
      tmpl = _.template(this.template);
      this.$el.html(tmpl(this.model.toJSON()));
      return this;
    },
    addChapter: function() {
      var chapter;
      chapter = new Site.Models.Chapter({
        title: '',
        content: ''
      });
      chapters.add(chapter);
      $('.chapter__controls-icon_mode_edit:last').click();
      return $('html, body').animate({
        scrollTop: $('.chapter__controls-icon_mode_edit:last').offset().top
      }, 1000);
    },
    editChapter: function() {
      var $chapter, chapter;
      chapter = {
        title: this.model.get('title'),
        content: toMarkdown(this.model.get('content'))
      };
      $chapter = this.$el;
      if (!$chapter.hasClass('chapter_mode_edit')) {
        $chapter.find('.chapter__content').css({
          position: 'relative'
        }).animate({
          right: '-50%',
          width: '50%'
        }, 500, function() {
          $chapter.find('.chapter__content').css({
            position: 'static'
          });
          return $chapter.find('.chapter__editor-form').animate({
            opacity: 1
          }, 500);
        });
        $chapter.find('.chapter__editor-form').animate({
          display: 'block',
          opacity: 0
        }, 500, function() {
          return $chapter.addClass('chapter_mode_edit');
        });
      }
      $chapter.find('.chapter__editor-form .chapter__editor-title').val(chapter.title);
      return $chapter.find('.chapter__editor-form .chapter__editor-content').html(chapter.content);
    },
    deleteChapter: function() {
      return this.$el.remove();
    },
    saveChapter: function() {
      var chapter;
      chapter = {
        title: this.$el.find('.chapter__editor-title').val(),
        content: markdown.toHTML(this.$el.find('.chapter__editor-content').val())
      };
      this.model.set({
        title: chapter.title,
        content: chapter.content
      });
      this.$el.removeClass('chapter_mode_edit');
      this.render();
      return false;
    },
    changeChapter: function() {
      var chapter;
      chapter = {
        title: '<h2 class="chapter__title">' + this.$el.find('.chapter__editor-title').val() + '</h2>',
        content: markdown.toHTML(this.$el.find('.chapter__editor-content').val())
      };
      this.$el.find('.chapter__content').html(chapter.title + chapter.content);
      return false;
    }
  });

  Site.Collections.Chapters = Backbone.Collection.extend({
    model: Site.Models.Chapter
  });

  Site.Views.ChaptersView = Backbone.View.extend({
    initialize: function() {
      this.collection.on('add', this.addOne, this);
      return this.collection.on('reset', this.resetAll, this);
    },
    render: function() {
      return this.resetAll();
    },
    addOne: function(chapter) {
      var chapterView;
      chapterView = new Site.Views.ChapterView({
        model: chapter
      });
      return this.$el.append(chapterView.render().el);
    },
    resetAll: function() {
      this.$el.empty();
      return this.collection.forEach(this.addOne, this);
    }
  });

  chapters = new Site.Collections.Chapters();

  chaptersView = new Site.Views.ChaptersView({
    collection: chapters
  });

  $(document).ready(function() {
    var chapter_data, _i, _len, _results;
    chaptersView.render();
    $('.main').append(chaptersView.$el);
    _results = [];
    for (_i = 0, _len = chapters_data.length; _i < _len; _i++) {
      chapter_data = chapters_data[_i];
      _results.push(chapters.add(new Site.Models.Chapter(chapter_data)));
    }
    return _results;
  });

}).call(this);
