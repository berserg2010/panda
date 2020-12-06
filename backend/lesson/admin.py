from django.contrib import admin

from common.utils import CommonIdModelAdmin, CommonFieldsModelAdmin, base_inline
from .models import (
    Lesson,
    Test,
    Word,
    Example,
    Article,
    Book,
)


@base_inline(Test.lessons.through)
class TestInline(admin.TabularInline):
    pass


@base_inline(Test.homework_lessons.through)
class TestHomeworkInline(admin.TabularInline):
    pass


@base_inline(Word.lessons.through)
class WordInline(admin.TabularInline):
    pass


@base_inline(Example.words.through)
class ExampleInline(admin.TabularInline):
    pass


@admin.register(Lesson)
class LessonAdmin(CommonFieldsModelAdmin):

    fields = (
        *CommonFieldsModelAdmin.fields,
        'tests',
        'words',
        'homework_tests',
        'homework_words',
        'articles',
        'books',
    )


@admin.register(Word)
class WordAdmin(CommonIdModelAdmin):

    list_display = (
        'spelling',
        'translation',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'spelling',
        'transcription',
        'translation',
    )
    save_on_top = False
    inlines = (ExampleInline, )


@admin.register(Example)
class ExampleAdmin(CommonIdModelAdmin):

    list_display = (
        'example',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'example',
    )
    save_on_top = False


@admin.register(Test)
class TestAdmin(CommonIdModelAdmin):

    list_display = (
        'question',
        'answer',
    )
    fields = (
        *CommonIdModelAdmin.fields,
        'question',
        'options',
        'answer',
    )
    save_on_top = False


@admin.register(Book)
class BookAdmin(CommonFieldsModelAdmin):

    fields = (
        *CommonFieldsModelAdmin.fields,
        'author',
        'isbn',
    )
    save_on_top = False


@admin.register(Article)
class ArticleAdmin(CommonFieldsModelAdmin):

    list_display = (
        *CommonFieldsModelAdmin.list_display,
        'url',
    )
    fields = (
        *CommonFieldsModelAdmin.fields,
        'url',
    )
    save_on_top = False
