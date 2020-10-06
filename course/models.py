from django.db import models

from common.models import CommonFields
from account.models import Teacher, Student
from lesson.models import Lesson


class BannerOfCourse(CommonFields):

    number_of_lessons = models.PositiveSmallIntegerField(verbose_name='количество уроков')
    cost = models.PositiveSmallIntegerField(verbose_name='стоимость')

    is_active = models.BooleanField(default=True, verbose_name='активный')

    class Meta:

        verbose_name = 'презентация курса'
        verbose_name_plural = 'презентации курсов'


class Course(models.Model):

    start = models.DateTimeField(verbose_name='начало курса')
    end = models.DateTimeField(verbose_name='окончание курса')
    prolong = models.DateTimeField(verbose_name='продление курса')

    banner_of_course = models.ForeignKey(BannerOfCourse, on_delete=models.PROTECT)
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT)
    student = models.ForeignKey(Student, on_delete=models.PROTECT)

    lessons = models.ManyToManyField(Lesson, through='CourseLesson')

    class Meta:

        verbose_name = 'курс'
        verbose_name_plural = 'курсы'


class CourseLesson(models.Model):

    finished = models.BooleanField(default=False, verbose_name='завершон')

    test_result = models.FloatField(default=0, verbose_name='результат по тесту')
    word_result = models.FloatField(default=0, verbose_name='результат по словам')
    game_result = models.FloatField(default=0, verbose_name='результат по игре')

    number = models.PositiveSmallIntegerField(verbose_name='номер урока')

    note = models.TextField(verbose_name='заметки')

    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    lesson = models.ForeignKey(Lesson, on_delete=models.PROTECT)

    class Meta:

        ordering = ('number',)


class Schedule(models.Model):

    datetime = models.DateTimeField(verbose_name='дата и время урока')

    course = models.ForeignKey('Course', on_delete=models.PROTECT)

    class Meta:

        verbose_name = 'расписание уроков'
