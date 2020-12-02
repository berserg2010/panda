from django.db import models

from common.models import CommonId, CommonFields
from lesson.models import Lesson


class GroupsOfCourses(CommonFields):

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'группа курсов'
        verbose_name_plural = '01 | Группы курсов'
        ordering = ('title', )


class PackageOfLessons(models.Model):

    count = models.PositiveSmallIntegerField(verbose_name='количество занятий')
    cost = models.PositiveSmallIntegerField(verbose_name='стоимость')

    def __str__(self) -> str:
        return f'{self.count} | {self.cost}'

    class Meta:
        verbose_name = 'количество занятий'
        verbose_name_plural = '02 | Количество занятий'
        ordering = ('count', 'cost')


class Course(CommonFields):

    is_published = models.BooleanField(default=False, verbose_name='опубликован')

    group_of_course = models.ForeignKey(GroupsOfCourses, on_delete=models.PROTECT, verbose_name='группа курса')

    image = models.ImageField(upload_to='img/course/', default='img/course/default.jpg', verbose_name='изображение курса')

    package_of_lessons = models.ManyToManyField(PackageOfLessons, related_name='courses', verbose_name='пакеты занятий')
    lessons = models.ManyToManyField(Lesson, through='CourseLesson', related_name='courses', verbose_name='уроки')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'курс'
        verbose_name_plural = '03 | Курсы'
        ordering = ('title', )


class Level(CommonFields):

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'уровень'
        verbose_name_plural = '04 | Уровни'
        ordering = ('title', )


class CourseLesson(CommonId):

    number = models.PositiveSmallIntegerField(verbose_name='номер урока')

    course = models.ForeignKey(Course, on_delete=models.PROTECT, verbose_name='курс')
    lesson = models.ForeignKey(Lesson, on_delete=models.PROTECT, verbose_name='урок')
    level = models.ForeignKey(Level, on_delete=models.PROTECT, verbose_name='уровень')

    def __str__(self):
        return f'{self.course} | {self.number} {self.lesson}'

    class Meta:
        verbose_name = 'уроки курсов'
        verbose_name_plural = '05 | Уроки курсов'
        ordering = ('number', )
