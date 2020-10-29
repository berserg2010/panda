from django.db import models

from common.models import CommonId, CommonFields
from account.models import Teacher, Student
from lesson.models import Lesson


class NumberOfLessons(models.Model):

    count = models.PositiveSmallIntegerField(verbose_name='количество уроков')

    def __str__(self) -> str:
        return f'{self.count}'

    class Meta:
        verbose_name = 'количество уроков'
        verbose_name_plural = 'количество уроков'


class Course(CommonFields):

    percentage_discount = models.PositiveSmallIntegerField(default=0, verbose_name='скидка в процентах')

    cost = models.PositiveSmallIntegerField(verbose_name='стоимость')

    number_of_lessons = models.ManyToManyField(NumberOfLessons, related_name='courses', verbose_name='количество уроков')
    lessons = models.ManyToManyField(Lesson, through='CourseLesson', related_name='courses')

    def get_discount(self):
        return self.cost / 100 * self.percentage_discount
    get_discount.short_description = 'скидка'

    def get_cost_with_discount(self):
        return self.cost - self.get_discount()
    get_cost_with_discount.short_description = 'стоимость со скидкой'

    def __str__(self):
        return f'{self.title} | {self.cost} руб./урок'

    class Meta:
        verbose_name = 'курс'
        verbose_name_plural = '01 | Курсы'


class CourseLesson(CommonId):

    number = models.PositiveSmallIntegerField(verbose_name='номер урока')

    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    lesson = models.ForeignKey(Lesson, on_delete=models.PROTECT)

    def __str__(self):
        return f'{self.course} <-> {self.number} | {self.lesson}'

    class Meta:
        verbose_name = 'Курс <-> урок'
        verbose_name_plural = '02 | Курсы <-> уроки'
        ordering = ('number',)


class PersonalCourse(CommonId):

    finished = models.BooleanField(default=False, verbose_name='завершен')

    course = models.ForeignKey(Course, on_delete=models.PROTECT, verbose_name='курс')
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT, verbose_name='учитель')
    student = models.ForeignKey(Student, on_delete=models.PROTECT, verbose_name='ученик')

    lessons = models.ManyToManyField(Lesson, through='PersonalCourseLesson', related_name='personal_course')

    def __str__(self):
        return f'{self.student} | {self.teacher}'

    class Meta:
        verbose_name = 'персональный курс'
        verbose_name_plural = '03 | Персональные курсы'


class Schedule(models.Model):

    datetime = models.DateTimeField(verbose_name='дата и время урока')

    course = models.ForeignKey('Course', on_delete=models.PROTECT)

    # Если урок перенесен, нужно удалить запись в Schedule

    def __str__(self):
        return f'{self.datetime.astimezone()}'

    class Meta:
        verbose_name = 'расписание уроков'
        verbose_name_plural = 'расписания уроков'
        ordering = ('datetime', )


class PersonalCourseLesson(CommonId):

    finished = models.BooleanField(default=False, verbose_name='завершен')

    test_result = models.FloatField(default=0, verbose_name='результат по тесту')
    word_result = models.FloatField(default=0, verbose_name='результат по словам')
    game_result = models.FloatField(default=0, verbose_name='результат по игре')

    note = models.TextField(default='', blank=True, verbose_name='заметки')

    personal_course = models.ForeignKey(PersonalCourse, on_delete=models.PROTECT)
    lesson = models.ForeignKey(Lesson, on_delete=models.PROTECT)


    def __str__(self):
        return f'{self.personal_course} | {self.lesson}'

    class Meta:

        verbose_name = 'персональный курс <-> урок'
        verbose_name_plural = '04 | Персональные курсы <-> уроки'
