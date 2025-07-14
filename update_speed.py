import os
import re
import json

BASE_DIR = 'static/baselines'
output = {}

# 支持两种命名：qwen_5.mp4 或 qwen.mp4（默认倍速为 1）
pattern_with_speed = re.compile(r'^(.*)_(\d+)\.mp4$')
pattern_no_speed = re.compile(r'^(.*)\.mp4$')

for task_type in os.listdir(BASE_DIR):
    task_path = os.path.join(BASE_DIR, task_type)
    if not os.path.isdir(task_path):
        continue

    task_entry = {}
    for filename in os.listdir(task_path):
        file_path = os.path.join(task_path, filename)
        if not os.path.isfile(file_path) or not filename.endswith('.mp4'):
            continue

        match_with_speed = pattern_with_speed.match(filename)
        match_no_speed = pattern_no_speed.match(filename)

        if match_with_speed:
            model_name = match_with_speed.group(1)
            speed = int(match_with_speed.group(2))
        elif match_no_speed:
            model_name = match_no_speed.group(1)
            speed = 1
        else:
            continue

        task_entry[model_name] = {
            "file": filename,
            "speed": speed
        }

    output[task_type] = task_entry

# 写入 index.json
with open(os.path.join(BASE_DIR, 'index.json'), 'w') as f:
    json.dump(output, f, indent=2)

print("✅ index.json generated at static/baselines/index.json")
