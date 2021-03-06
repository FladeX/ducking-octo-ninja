(function() {
  this.chapters_data = [
    {
      title: 'CHAPTER I. Down the Rabbit-Hole',
      content: '<p class="chapter__text">Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, \'and what is the use of a book,\' thought Alice \'without pictures or conversations?\'</p><p class="chapter__text">So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.</p>'
    }, {
      title: 'CHAPTER II. The Pool of Tears',
      content: '<p class="chapter__text">Curiouser and curiouser!\' cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); \'now I\'m opening out like the largest telescope that ever was! Good-bye, feet!\' (for when she looked down at her feet, they seemed to be almost out of sight, they were getting so far off). \'Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears? I\'m sure _I_ shan\'t be able! I shall be a great deal too far off to trouble myself about you: you must manage the best way you can;--but I must be kind to them,\' thought Alice, \'or perhaps they won\'t walk the way I want to go! Let me see: I\'ll give them a new pair of boots every Christmas.\'</p><p class="chapter__text">And she went on planning to herself how she would manage it. \'They must go by the carrier,\' she thought; \'and how funny it\'ll seem, sending presents to one\'s own feet! And how odd the directions will look!</p>'
    }, {
      title: 'CHAPTER III. A Caucus-Race and a Long Tale',
      content: '<p class="chapter__text">They were indeed a queer-looking party that assembled on the bank--the birds with draggled feathers, the animals with their fur clinging close to them, and all dripping wet, cross, and uncomfortable.</p><p class="chapter__text">The first question of course was, how to get dry again: they had a consultation about this, and after a few minutes it seemed quite natural to Alice to find herself talking familiarly with them, as if she had known them all her life. Indeed, she had quite a long argument with the Lory, who at last turned sulky, and would only say, \'I am older than you, and must know better\'; and this Alice would not allow without knowing how old it was, and, as the Lory positively refused to tell its age, there was no more to be said.</p>'
    }, {
      title: 'CHAPTER IV. The Rabbit Sends in a Little Bill',
      content: '<p class="chapter__text">It was the White Rabbit, trotting slowly back again, and looking anxiously about as it went, as if it had lost something; and she heard it muttering to itself \'The Duchess! The Duchess! Oh my dear paws! Oh my fur and whiskers! She\'ll get me executed, as sure as ferrets are ferrets! Where CAN I have dropped them, I wonder?\' Alice guessed in a moment that it was looking for the fan and the pair of white kid gloves, and she very good-naturedly began hunting about for them, but they were nowhere to be seen--everything seemed to have changed since her swim in the pool, and the great hall, with the glass table and the little door, had vanished completely.</p><p class="chapter__text">Very soon the Rabbit noticed Alice, as she went hunting about, and called out to her in an angry tone, \'Why, Mary Ann, what ARE you doing out here? Run home this moment, and fetch me a pair of gloves and a fan! Quick, now!\' And Alice was so much frightened that she ran off at once in the direction it pointed to, without trying to explain the mistake it had made.</p>'
    }, {
      title: 'CHAPTER V. Advice from a Caterpillar',
      content: '<p class="chapter__text">The Caterpillar and Alice looked at each other for some time in silence: at last the Caterpillar took the hookah out of its mouth, and addressed her in a languid, sleepy voice.</p><p class="chapter__text">\'Who are YOU?\' said the Caterpillar.</p><p class="chapter__text">This was not an encouraging opening for a conversation. Alice replied, rather shyly, \'I--I hardly know, sir, just at present--at least I know who I WAS when I got up this morning, but I think I must have been changed several times since then.\'</p>'
    }
  ];

}).call(this);

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
