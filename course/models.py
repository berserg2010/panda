from django.db import models

from common.models import CommonFields
from account.models import Teacher, Student
from lesson.models import Lesson


class BannerOfCourse(CommonFields):

    cost = models.PositiveSmallIntegerField(verbose_name='стоимость')
    percentage_discount = models.PositiveSmallIntegerField(default=0, verbose_name='скидка в процентах')

    is_active = models.BooleanField(default=True, verbose_name='активный')

    number_of_lessons = models.ManyToManyField('NumberOfLessons', verbose_name='количество уроков')


    def get_discount(self):
        return self.cost / 100 * self.percentage_discount


    def get_cost_with_discount(self):
        return self.cost - self.get_discount()


    def __str__(self):
        return f'{self.title} | {self.cost} руб./урок'


    class Meta:

        verbose_name = 'презентация курса'
        verbose_name_plural = '01 | Презентации курсов'


class NumberOfLessons(models.Model):

    count = models.PositiveSmallIntegerField()


    def __str__(self) -> str:
        return f'{self.count}'


    class Meta:

        verbose_name = 'количество уроков'
        verbose_name_plural = 'количество уроков'


class Course(models.Model):

    start = models.DateTimeField(default='', null=True, blank=True, verbose_name='начало курса')
    end = models.DateTimeField(default='', null=True, blank=True, verbose_name='окончание курса')
    prolong = models.DateTimeField(default='', null=True, blank=True, verbose_name='продление курса')

    banner_of_course = models.ForeignKey(BannerOfCourse, on_delete=models.PROTECT)
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT)
    student = models.ForeignKey(Student, on_delete=models.PROTECT)

    lessons = models.ManyToManyField(Lesson, through='CourseLesson')


    def __str__(self):
        return f'{self.banner_of_course.title} | {self.teacher} | {self.student} | {self.start or "--"}/{self.end or "--"}/{self.prolong or "--"}'


    class Meta:

        verbose_name = 'курс'
        verbose_name_plural = '02 | Курсы'


class CourseLesson(models.Model):

    finished = models.BooleanField(default=False, verbose_name='завершон')

    test_result = models.FloatField(default=0, verbose_name='результат по тесту')
    word_result = models.FloatField(default=0, verbose_name='результат по словам')
    game_result = models.FloatField(default=0, verbose_name='результат по игре')

    number = models.PositiveSmallIntegerField(verbose_name='номер урока')

    note = models.TextField(default='', blank=True, verbose_name='заметки')

    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    lesson = models.ForeignKey(Lesson, on_delete=models.PROTECT)


    def __str__(self):
        return f'{self.course} <-> {self.number} | {self.lesson}'


    class Meta:

        verbose_name = 'Курс <-> урок'
        verbose_name_plural = '03 | Курсы <-> уроки'
        ordering = ('number',)


class Schedule(models.Model):

    datetime = models.DateTimeField(verbose_name='дата и время урока')

    course = models.ForeignKey('Course', on_delete=models.PROTECT)


    class Meta:
        verbose_name = 'расписание уроков'
