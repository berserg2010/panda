from django.db import models

from common.models import CommonId
from account.models import Teacher, Student
from course.models import Course, CourseLesson
from lesson.models import Lesson


class BasicRelationshipTable(CommonId):

    finished = models.BooleanField(default=False, verbose_name='завершен')

    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT, verbose_name='учитель')
    student = models.ForeignKey(Student, on_delete=models.PROTECT, verbose_name='ученик')

    class Meta:
        abstract = True


class FreeLesson(BasicRelationshipTable):

    datetime = models.DateTimeField(verbose_name='дата и время занятия')

    def __str__(self):
        return f'{self.datetime.astimezone()}'

    class Meta:
        verbose_name = 'бесплатное занятие'
        verbose_name_plural = 'бесплатные занятия'
        ordering = ('datetime', )


class PaidCourse(BasicRelationshipTable):

    course = models.ForeignKey(Course, on_delete=models.PROTECT, verbose_name='курс')

    lessons = models.ManyToManyField(Lesson, through='LessonResults', related_name='paid_courses', verbose_name='уроки')

    def __str__(self):
        return f'{self.course}'

    class Meta:
        verbose_name = 'оплаченный курс'
        verbose_name_plural = '05 | Оплаченные курсы'


class Schedule(models.Model):

    datetime = models.DateTimeField(verbose_name='дата и время занятия')

    course = models.ForeignKey(PaidCourse, on_delete=models.PROTECT, verbose_name='курс')

    def __str__(self):
        return f'{self.datetime.astimezone()}'

    class Meta:
        verbose_name = 'расписание занятий'
        verbose_name_plural = 'расписания занятий'
        ordering = ('datetime', )


class LessonResults(CommonId):

    finished = models.BooleanField(default=False, verbose_name='завершен')

    test_result = models.FloatField(default=0, verbose_name='результат по тестам')
    word_result = models.FloatField(default=0, verbose_name='результат по словам')
    game_result = models.FloatField(default=0, verbose_name='результат по игре')

    note = models.TextField(default='', blank=True, verbose_name='заметки')

    paid_course = models.ForeignKey(PaidCourse, on_delete=models.PROTECT, related_name='paid_course_lessons', verbose_name='оплаченный курс')
    course_lesson = models.ForeignKey(CourseLesson, null=True, blank=True, on_delete=models.PROTECT, related_name='paid_course_lessons', verbose_name='курс <-> урок')
    lesson = models.ForeignKey(Lesson, on_delete=models.PROTECT, verbose_name='урок')


    def __str__(self):
        return f'{self.paid_course} | {self.lesson}'

    class Meta:

        verbose_name = 'оплаченный курс <-> урок'
        verbose_name_plural = '06 | Оплаченные курсы <-> уроки'
