import os
import json

# 根目录
DATA_DIR = os.path.join("static", "data")
INDEX_FILE = os.path.join(DATA_DIR, "index.json")

def update_index():
    index = {}

    # 遍历 t0、t1、...
    for task_type in sorted(os.listdir(DATA_DIR)):
        type_path = os.path.join(DATA_DIR, task_type)
        if not os.path.isdir(type_path):
            continue

        task_list = []
        for entry in os.listdir(type_path):
            entry_path = os.path.join(type_path, entry)
            if os.path.isdir(entry_path):
                task_list.append(entry)

        # 存入字典
        index[task_type] = sorted(task_list)

    # 写入 index.json
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(index, f, indent=2, ensure_ascii=False)

    print(f"✅ index.json updated with {len(index)} types")

if __name__ == "__main__":
    update_index()
