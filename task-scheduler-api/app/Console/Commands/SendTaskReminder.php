<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Mail\DeadlineReminderMail;
use Illuminate\Support\Facades\Mail;

class SendTaskReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-task-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $users = User::where(
            'email_notification',
            true
        )->get();

        foreach ($users as $user) {

            $tasks = $user
                ->tasks()
                ->whereDate(
                    'due_date',
                    today()->addDay()
                )
                ->where(
                    'status',
                    '!=',
                    'Completed'
                )
                ->get();

            foreach ($tasks as $task) {

                Mail::to($user->email)
                    ->send(
                        new DeadlineReminderMail($task)
                    );

            }

        }

    }
}
