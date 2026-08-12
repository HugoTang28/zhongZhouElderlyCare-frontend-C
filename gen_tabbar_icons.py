#!/usr/bin/env python3
# 生成家属端小程序 tabBar 图标：5 个页面 x 普通/选中两色
# 矢量绘制于 243x243 画布，再 LANCZOS 降采样到 81x81 以获得平滑边缘
import os
from PIL import Image, ImageDraw

OUT = os.path.join(os.path.dirname(__file__), 'src', 'static', 'tabbar')
os.makedirs(OUT, exist_ok=True)

S = 243
NORMAL = (122, 126, 131, 255)
ACTIVE = (59, 124, 255, 255)
LW = 15


def canvas():
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def person(draw, cx, head_cy, r, color):
    # 头
    draw.ellipse([cx - r, head_cy - r, cx + r, head_cy + r], outline=color, width=LW)
    # 身体（下半圆弧）
    body_r = int(r * 1.7)
    body_top = head_cy + r
    draw.pieslice([cx - body_r, body_top, cx + body_r, body_top + 2 * body_r],
                  start=180, end=360, outline=color, width=LW)


def draw_family(color):
    img, d = canvas()
    person(d, 84, 80, 30, color)    # 大人
    person(d, 160, 116, 22, color)  # 小孩
    return img


def draw_visit(color):
    img, d = canvas()
    d.rounded_rectangle([58, 52, 185, 162], radius=26, outline=color, width=LW)
    # 气泡小尾巴
    d.line([(96, 156), (96, 186), (126, 160)], fill=color, width=LW, joint='curve')
    # 三点
    for x in (101, 128, 155):
        d.ellipse([x - 8, 100, x + 8, 116], fill=color)
    return img


def draw_bill(color):
    img, d = canvas()
    d.rounded_rectangle([62, 56, 181, 174], radius=18, outline=color, width=LW)
    for y in (94, 118, 142):
        d.line([(84, y), (160, y)], fill=color, width=LW)
    return img


def draw_care(color):
    img, d = canvas()
    # 实心圆角医疗十字
    d.rounded_rectangle([108, 54, 135, 189], radius=12, fill=color)
    d.rounded_rectangle([72, 92, 171, 119], radius=12, fill=color)
    return img


def draw_message(color):
    img, d = canvas()
    d.rounded_rectangle([56, 70, 187, 166], radius=16, outline=color, width=LW)
    d.line([(58, 80), (121, 126), (184, 80)], fill=color, width=LW, joint='curve')
    return img


ICONS = {
    'home': draw_family,
    'visit': draw_visit,
    'bill': draw_bill,
    'care': draw_care,
    'msg': draw_message,
}

for name, fn in ICONS.items():
    fn(NORMAL).resize((81, 81), Image.LANCZOS).save(os.path.join(OUT, f'{name}.png'))
    fn(ACTIVE).resize((81, 81), Image.LANCZOS).save(os.path.join(OUT, f'{name}_active.png'))
    print('generated', name)

print('all done ->', OUT)
