from django.db import models
from django.db.models import Q

from common.utils import date_now
from common.models import CommonId
from account.models import Teacher, Student
from course.models import Course, CourseLesson
from lesson.models import Lesson


class BasicRelationshipTable(CommonId):

    finished = models.BooleanField(default=False, verbose_name='завершен')

    teacher = models.ForeignKey(Teacher, null=True, blank=True, on_delete=models.CASCADE, verbose_name='учитель')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name='ученик')

    class Meta:
        abstract = True


class FreeLesson(BasicRelationshipTable):

    datetime = models.DateTimeField(null=True, blank=True, verbose_name='дата и время занятия')

    def __str__(self):
        return f'{self.student}'

    class Meta:
        verbose_name = 'пробное занятие'
        verbose_name_plural = '01 | Пробные занятия'
        ordering = ('-datetime', )


class PaidCourse(BasicRelationshipTable):

    course = models.ForeignKey(Course, on_delete=models.PROTECT, verbose_name='курс')

    lessons = models.ManyToManyField(Lesson, through='LessonResults', related_name='paid_courses', verbose_name='уроки')

    def __str__(self):
        return f'{self.course} | {self.student}'

    class Meta:
        verbose_name = 'оплаченный курс'
        verbose_name_plural = '02 | Оплаченные курсы'


class Schedule(models.Model):

    finished = models.BooleanField(default=False, verbose_name='занятие проведено')

    datetime = models.DateTimeField(verbose_name='дата и время занятия')

    paid_course = models.ForeignKey(PaidCourse, on_delete=models.CASCADE, verbose_name='курс')

    @classmethod
    def get_student_schedule(cls, student, groups_courses, first_date, second_date=date_now()):
        return cls.objects.filter(
            Q(paid_course__student=student),
            Q(paid_course__course__group_of_course=groups_courses),
            Q(datetime__gte=first_date) | Q(datetime__lte=second_date),
        )

    @property
    def student(self):
        return self.paid_course.student

    @property
    def teacher(self):
        return self.paid_course.teacher

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

        verbose_name = 'результат занятия'
        verbose_name_plural = '03 | Результаты занятий'
